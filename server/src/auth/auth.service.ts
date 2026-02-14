import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        if (!email) return null;
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        };
    }

    async register(userDto: any) {
        // Check if user exists
        const existing = await this.usersService.findOne(userDto.email);
        if (existing) {
            throw new UnauthorizedException('User already exists');
        }
        const user = await this.usersService.create(userDto);
        const { password, ...result } = user;
        return this.login(result);
    }
}
