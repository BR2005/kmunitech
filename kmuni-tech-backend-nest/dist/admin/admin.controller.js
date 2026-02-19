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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../common/auth/jwt-auth.guard");
const roles_decorator_1 = require("../common/auth/roles.decorator");
const roles_guard_1 = require("../common/auth/roles.guard");
const user_entity_1 = require("../entities/user.entity");
const course_entity_1 = require("../entities/course.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
const user_entity_2 = require("../entities/user.entity");
const auth_service_1 = require("../auth/auth.service");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AdminController = class AdminController {
    constructor(usersRepo, coursesRepo, enrollmentsRepo, auth) {
        this.usersRepo = usersRepo;
        this.coursesRepo = coursesRepo;
        this.enrollmentsRepo = enrollmentsRepo;
        this.auth = auth;
    }
    async analytics() {
        const totalUsers = await this.usersRepo.count();
        const totalCourses = await this.coursesRepo.count();
        const totalEnrollments = await this.enrollmentsRepo.count();
        const totalStudents = await this.usersRepo.count({ where: { role: user_entity_2.UserRole.STUDENT } });
        const totalInstructors = await this.usersRepo.count({ where: { role: user_entity_2.UserRole.INSTRUCTOR } });
        return {
            totalUsers,
            totalStudents,
            totalInstructors,
            totalCourses,
            totalEnrollments,
        };
    }
    async courses() {
        const courses = await this.coursesRepo.find({ relations: { instructor: true } });
        return courses.map((c) => ({
            id: c.id,
            title: c.title,
            description: c.description ?? '',
            thumbnail: c.thumbnail ?? undefined,
            instructorId: c.instructor?.id,
            instructorName: c.instructor?.name ?? 'Unknown',
            price: c.price,
            level: c.level ?? 'beginner',
            category: c.category ?? 'web-dev',
            tags: c.tags ?? [],
            totalDuration: c.totalDuration ?? 0,
            rating: c.rating ?? 0,
            studentsCount: c.studentsCount ?? 0,
            isFeatured: Boolean(c.isFeatured),
            createdAt: '',
        }));
    }
    async users() {
        const users = await this.usersRepo.find();
        return users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role === 'ADMIN'
                ? 'admin'
                : u.role === 'INSTRUCTOR'
                    ? 'instructor'
                    : 'student',
            createdAt: '',
        }));
    }
    async resetPassword(userId, dto) {
        await this.auth.resetPassword(userId, dto.newPassword);
        return { success: true };
    }
    async deleteUser(userId) {
        await this.usersRepo.delete({ id: userId });
        return { success: true };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('analytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "analytics", null);
__decorate([
    (0, common_1.Get)('courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "courses", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "users", null);
__decorate([
    (0, common_1.Post)('users/:userId/reset-password'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Delete)('users/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('admin'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map