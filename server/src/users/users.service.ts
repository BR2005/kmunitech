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
}
