import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { hashPassword } from '../auth/password.util';

@Injectable()
export class AdminSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim();
    const adminPassword = (process.env.ADMIN_PASSWORD || '').trim();
    const adminName = (process.env.ADMIN_NAME || 'Admin').trim() || 'Admin';

    if (!adminEmail || !adminPassword) {
      this.logger.warn(
        'ADMIN_EMAIL/ADMIN_PASSWORD not set; skipping admin seed',
      );
      return;
    }

    const existing = await this.usersRepo.findOne({ where: { email: adminEmail } });
    if (existing) {
      if (existing.role !== UserRole.ADMIN) {
        existing.role = UserRole.ADMIN;
        await this.usersRepo.save(existing);
        this.logger.log(`Promoted ${adminEmail} to ADMIN`);
      }
      return;
    }

    const user = this.usersRepo.create({
      name: adminName,
      email: adminEmail,
      password: hashPassword(adminPassword),
      role: UserRole.ADMIN,
    });
    await this.usersRepo.save(user);
    this.logger.log(`Seeded admin user: ${adminEmail}`);
  }
}
