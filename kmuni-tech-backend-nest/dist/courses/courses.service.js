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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../entities/course.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const user_entity_1 = require("../entities/user.entity");
let CoursesService = class CoursesService {
    constructor(coursesRepo, usersRepo, enrollmentsRepo, lessonsRepo) {
        this.coursesRepo = coursesRepo;
        this.usersRepo = usersRepo;
        this.enrollmentsRepo = enrollmentsRepo;
        this.lessonsRepo = lessonsRepo;
    }
    async listAll() {
        const courses = await this.coursesRepo.find({ relations: { instructor: true } });
        return courses.map((c) => this.toCourseListDto(c));
    }
    async listFeatured() {
        const courses = await this.coursesRepo.find({
            where: { isFeatured: true },
            relations: { instructor: true },
        });
        return courses.map((c) => this.toCourseListDto(c));
    }
    async getById(id) {
        const course = await this.coursesRepo.findOne({
            where: { id },
            relations: { instructor: true, lessons: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return {
            ...this.toCourseListDto(course),
            lessons: (course.lessons ?? [])
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((l) => ({
                id: l.id,
                title: l.title,
                description: l.description ?? undefined,
                duration: l.duration,
                order: l.order,
                isPreview: l.isPreview,
            })),
        };
    }
    async enroll(courseId, studentId) {
        const course = await this.coursesRepo.findOne({
            where: { id: courseId },
            relations: { instructor: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const student = await this.usersRepo.findOne({ where: { id: studentId } });
        if (!student)
            throw new common_1.BadRequestException('Student not found');
        const existing = await this.enrollmentsRepo.findOne({
            where: { course: { id: courseId }, student: { id: studentId } },
            relations: { course: true, student: true },
        });
        if (existing)
            return { success: true };
        const enrollment = this.enrollmentsRepo.create({
            course,
            student,
            progress: 0,
        });
        await this.enrollmentsRepo.save(enrollment);
        course.studentsCount = (course.studentsCount ?? 0) + 1;
        await this.coursesRepo.save(course);
        return { success: true };
    }
    toCourseListDto(course) {
        return {
            id: course.id,
            title: course.title,
            description: course.description ?? '',
            thumbnail: course.thumbnail ?? undefined,
            instructorId: course.instructor?.id ?? undefined,
            instructorName: course.instructor?.name ?? 'Unknown',
            price: course.price,
            level: course.level ?? 'beginner',
            category: course.category ?? 'web-dev',
            tags: course.tags ?? [],
            totalDuration: course.totalDuration ?? 0,
            rating: course.rating ?? 0,
            studentsCount: course.studentsCount ?? 0,
            isFeatured: Boolean(course.isFeatured),
            createdAt: '',
        };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(3, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map