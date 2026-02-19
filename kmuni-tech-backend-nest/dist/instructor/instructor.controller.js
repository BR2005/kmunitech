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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../common/auth/jwt-auth.guard");
const roles_decorator_1 = require("../common/auth/roles.decorator");
const roles_guard_1 = require("../common/auth/roles.guard");
const current_user_decorator_1 = require("../common/auth/current-user.decorator");
const create_course_dto_1 = require("./dto/create-course.dto");
const instructor_service_1 = require("./instructor.service");
let InstructorController = class InstructorController {
    constructor(instructors) {
        this.instructors = instructors;
    }
    courses(user) {
        return this.instructors.listCourses(user.userId);
    }
    analytics(user) {
        return this.instructors.analytics(user.userId);
    }
    createCourse(user, dto) {
        return this.instructors.createCourse(user.userId, dto);
    }
    async uploadVideo(user, lessonId, file) {
        await this.instructors.ensureLessonOwnedByInstructor(lessonId, user.userId);
        const urlPath = `/uploads/${file.filename}`;
        await this.instructors.saveLessonVideoUrl(lessonId, urlPath);
        return { success: true, url: urlPath };
    }
};
exports.InstructorController = InstructorController;
__decorate([
    (0, common_1.Get)('courses'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "courses", null);
__decorate([
    (0, common_1.Get)('analytics'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "analytics", null);
__decorate([
    (0, common_1.Post)('courses'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)('lessons/:lessonId/video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => cb(null, 'uploads'),
            filename: (_req, file, cb) => {
                const safeExt = (0, path_1.extname)(file.originalname || '') || '.bin';
                cb(null, `lesson-${Date.now()}${safeExt}`);
            },
        }),
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('lessonId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "uploadVideo", null);
exports.InstructorController = InstructorController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor'),
    (0, common_1.Controller)('instructor'),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService])
], InstructorController);
//# sourceMappingURL=instructor.controller.js.map