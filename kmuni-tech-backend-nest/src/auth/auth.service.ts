import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt?: string;
};

type AuthResponse = {
  success: boolean;
  message?: string;
  user?: ApiUser;
  token?: string;
};

function toAppRole(role: UserRole): ApiUser['role'] {
  if (role === UserRole.ADMIN) return 'admin';
  if (role === UserRole.INSTRUCTOR) return 'instructor';
  return 'student';
}

function toEntityRole(role: ApiUser['role']): UserRole {
  if (role === 'admin') return UserRole.ADMIN;
  if (role === 'instructor') return UserRole.INSTRUCTOR;
  return UserRole.STUDENT;
}

function sanitizeUser(user: User): ApiUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: toAppRole(user.role),
  };
}

function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 3) return false;
  const [algo, saltHex, hashHex] = parts;
  if (algo !== 'scrypt') return false;
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponse> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already in use');

    const user = this.usersRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashPassword(dto.password),
      role: toEntityRole(dto.role),
    });
    const saved = await this.usersRepo.save(user);
    const token = await this.signToken(saved);

    return { success: true, user: sanitizeUser(saved), token };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user || !verifyPassword(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.signToken(user);
    return { success: true, user: sanitizeUser(user), token };
  }

  async me(userId: string): Promise<ApiUser> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    return sanitizeUser(user);
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');
    user.password = hashPassword(newPassword);
    await this.usersRepo.save(user);
  }

  private async signToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: toAppRole(user.role),
    };
    return this.jwt.signAsync(payload);
  }
}
