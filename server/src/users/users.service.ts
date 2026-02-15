import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async create(user: Partial<User>): Promise<User> {
        if (!user.password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.usersRepository.create({
            ...user,
            password: hashedPassword,
        });
        return this.usersRepository.save(newUser);
    }

    async findAllSafe(): Promise<Array<Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'>>> {
        const users = await this.usersRepository.find({
            order: { createdAt: 'DESC' },
        });
        return users.map(({ id, name, email, role, createdAt, updatedAt }) => ({
            id,
            name,
            email,
            role,
            createdAt,
            updatedAt,
        }));
    }

    async setPasswordById(id: string, newPassword: string): Promise<boolean> {
        const user = await this.findOneById(id);
        if (!user) return false;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.usersRepository.save(user);
        return true;
    }
}
