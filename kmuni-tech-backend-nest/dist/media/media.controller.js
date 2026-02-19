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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../common/auth/jwt-auth.guard");
const current_user_decorator_1 = require("../common/auth/current-user.decorator");
const lesson_entity_1 = require("../entities/lesson.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
let MediaController = class MediaController {
    constructor(lessonsRepo, enrollmentsRepo) {
        this.lessonsRepo = lessonsRepo;
        this.enrollmentsRepo = enrollmentsRepo;
    }
    async playback(lessonId, user) {
        const lesson = await this.lessonsRepo.findOne({
            where: { id: lessonId },
            relations: { course: true },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (!lesson.videoUrl)
            throw new common_1.NotFoundException('No video uploaded');
        const isInstructorOrAdmin = user.role === 'instructor' || user.role === 'admin';
        if (!lesson.isPreview && !isInstructorOrAdmin) {
            const enrollment = await this.enrollmentsRepo.findOne({
                where: { student: { id: user.userId }, course: { id: lesson.course.id } },
                relations: { student: true, course: true },
            });
            if (!enrollment)
                throw new common_1.NotFoundException('Not enrolled');
        }
        const base = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        const url = lesson.videoUrl.startsWith('http')
            ? lesson.videoUrl
            : `${base}${lesson.videoUrl}`;
        return { url };
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Get)('lessons/:lessonId/playback'),
    __param(0, (0, common_1.Param)('lessonId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "playback", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('media'),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(1, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MediaController);
//# sourceMappingURL=media.controller.js.map