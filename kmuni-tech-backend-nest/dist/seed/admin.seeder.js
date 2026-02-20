"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const password_util_1 = require("../auth/password.util");
let AdminSeeder = AdminSeeder_1 = class AdminSeeder {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
        this.logger = new common_1.Logger(AdminSeeder_1.name);
    }
    async onApplicationBootstrap() {
        const adminEmail = (process.env.ADMIN_EMAIL || '').trim();
        const adminPassword = (process.env.ADMIN_PASSWORD || '').trim();
        const adminName = (process.env.ADMIN_NAME || 'Admin').trim() || 'Admin';
        if (!adminEmail || !adminPassword) {
            this.logger.warn('ADMIN_EMAIL/ADMIN_PASSWORD not set; skipping admin seed');
            return;
        }
        const existing = await this.usersRepo.findOne({ where: { email: adminEmail } });
        if (existing) {
            if (existing.role !== user_entity_1.UserRole.ADMIN) {
                existing.role = user_entity_1.UserRole.ADMIN;
                await this.usersRepo.save(existing);
                this.logger.log(`Promoted ${adminEmail} to ADMIN`);
            }
            return;
        }
        const user = this.usersRepo.create({
            name: adminName,
            email: adminEmail,
            password: (0, password_util_1.hashPassword)(adminPassword),
            role: user_entity_1.UserRole.ADMIN,
        });
        await this.usersRepo.save(user);
        this.logger.log(`Seeded admin user: ${adminEmail}`);
    }
};
exports.AdminSeeder = AdminSeeder;
exports.AdminSeeder = AdminSeeder = AdminSeeder_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminSeeder);
//# sourceMappingURL=admin.seeder.js.map