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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("../entities/enrollment.entity");
let StudentService = class StudentService {
    constructor(enrollmentsRepo) {
        this.enrollmentsRepo = enrollmentsRepo;
    }
    async listEnrollments(studentId) {
        const enrollments = await this.enrollmentsRepo.find({
            where: { student: { id: studentId } },
            relations: { course: { instructor: true }, student: true },
        });
        return enrollments.map((e) => ({
            id: e.id,
            courseId: e.course.id,
            courseTitle: e.course.title,
            courseThumbnail: e.course.thumbnail ?? undefined,
            instructorName: e.course.instructor?.name ?? 'Unknown',
            progress: e.progress ?? 0,
            enrolledAt: '',
            completedAt: null,
        }));
    }
    async updateProgress(studentId, enrollmentId, progress) {
        if (progress < 0 || progress > 100) {
            throw new common_1.BadRequestException('Progress must be between 0 and 100');
        }
        const enrollment = await this.enrollmentsRepo.findOne({
            where: { id: enrollmentId },
            relations: { student: true, course: { instructor: true } },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.student.id !== studentId) {
            throw new common_1.BadRequestException('Not your enrollment');
        }
        enrollment.progress = progress;
        const saved = await this.enrollmentsRepo.save(enrollment);
        return {
            id: saved.id,
            courseId: saved.course.id,
            courseTitle: saved.course.title,
            courseThumbnail: saved.course.thumbnail ?? undefined,
            instructorName: saved.course.instructor?.name ?? 'Unknown',
            progress: saved.progress ?? 0,
            enrolledAt: '',
            completedAt: progress >= 100 ? new Date().toISOString() : null,
        };
    }
    async listActivities(studentId) {
        const enrollments = await this.listEnrollments(studentId);
        const now = new Date().toISOString();
        return enrollments.slice(0, 10).map((e) => ({
            id: `enroll-${e.id}`,
            type: e.progress >= 100 ? 'completion' : 'enrollment',
            title: e.progress >= 100 ? 'Course completed' : 'Enrolled in course',
            description: e.courseTitle,
            timestamp: now,
        }));
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map