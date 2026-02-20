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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const password_util_1 = require("./password.util");
function toAppRole(role) {
    if (role === user_entity_1.UserRole.ADMIN)
        return 'admin';
    if (role === user_entity_1.UserRole.INSTRUCTOR)
        return 'instructor';
    return 'student';
}
function toEntityRole(role) {
    if (role === 'admin')
        return user_entity_1.UserRole.ADMIN;
    if (role === 'instructor')
        return user_entity_1.UserRole.INSTRUCTOR;
    return user_entity_1.UserRole.STUDENT;
}
function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: toAppRole(user.role),
    };
}
let AuthService = class AuthService {
    constructor(usersRepo, jwt) {
        this.usersRepo = usersRepo;
        this.jwt = jwt;
    }
    async signup(dto) {
        if (dto.password !== dto.confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (existing)
            throw new common_1.BadRequestException('Email already in use');
        const user = this.usersRepo.create({
            name: dto.name,
            email: dto.email,
            password: (0, password_util_1.hashPassword)(dto.password),
            role: toEntityRole(dto.role),
        });
        const saved = await this.usersRepo.save(user);
        const token = await this.signToken(saved);
        return { success: true, user: sanitizeUser(saved), token };
    }
    async login(dto) {
        const user = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (!user || !(0, password_util_1.verifyPassword)(dto.password, user.password)) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = await this.signToken(user);
        return { success: true, user: sanitizeUser(user), token };
    }
    async me(userId) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return sanitizeUser(user);
    }
    async resetPassword(userId, newPassword) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        user.password = (0, password_util_1.hashPassword)(newPassword);
        await this.usersRepo.save(user);
    }
    async signToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: toAppRole(user.role),
        };
        return this.jwt.signAsync(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map