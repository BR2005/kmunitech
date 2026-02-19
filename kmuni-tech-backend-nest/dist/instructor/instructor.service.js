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
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("../entities/course.entity");
const lesson_entity_1 = require("../entities/lesson.entity");
const enrollment_entity_1 = require("../entities/enrollment.entity");
const user_entity_1 = require("../entities/user.entity");
let InstructorService = class InstructorService {
    constructor(coursesRepo, lessonsRepo, enrollmentsRepo, usersRepo) {
        this.coursesRepo = coursesRepo;
        this.lessonsRepo = lessonsRepo;
        this.enrollmentsRepo = enrollmentsRepo;
        this.usersRepo = usersRepo;
    }
    async listCourses(instructorId) {
        const courses = await this.coursesRepo.find({
            where: { instructor: { id: instructorId } },
            relations: { instructor: true },
        });
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
    async analytics(instructorId) {
        const courses = await this.coursesRepo.find({
            where: { instructor: { id: instructorId } },
        });
        const totalCourses = courses.length;
        const totalStudents = courses.reduce((sum, c) => sum + (c.studentsCount ?? 0), 0);
        const averageRating = totalCourses
            ? courses.reduce((sum, c) => sum + (c.rating ?? 0), 0) / totalCourses
            : 0;
        return { totalCourses, totalStudents, averageRating };
    }
    async createCourse(instructorId, dto) {
        const instructor = await this.usersRepo.findOne({ where: { id: instructorId } });
        if (!instructor)
            throw new common_1.BadRequestException('Instructor not found');
        const totalDuration = (dto.lessons ?? []).reduce((sum, l) => sum + (l.duration ?? 0), 0);
        const course = this.coursesRepo.create({
            title: dto.title,
            description: dto.description,
            thumbnail: dto.thumbnail ?? undefined,
            price: dto.price,
            level: dto.level,
            category: dto.category,
            tags: dto.tags ?? [],
            totalDuration,
            rating: 0,
            studentsCount: 0,
            isFeatured: false,
            instructor,
        });
        const savedCourse = await this.coursesRepo.save(course);
        const lessons = (dto.lessons ?? []).map((l) => this.lessonsRepo.create({
            title: l.title,
            description: l.description ?? undefined,
            duration: l.duration,
            order: l.order,
            isPreview: Boolean(l.isPreview),
            videoUrl: l.videoUrl ?? undefined,
            content: l.content ?? undefined,
            course: savedCourse,
        }));
        const savedLessons = await this.lessonsRepo.save(lessons);
        return {
            id: savedCourse.id,
            title: savedCourse.title,
            description: savedCourse.description ?? '',
            thumbnail: savedCourse.thumbnail ?? undefined,
            instructorId: instructor.id,
            instructorName: instructor.name,
            price: savedCourse.price,
            level: savedCourse.level ?? 'beginner',
            category: savedCourse.category ?? 'web-dev',
            tags: savedCourse.tags ?? [],
            lessons: savedLessons
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
            totalDuration: savedCourse.totalDuration ?? 0,
            rating: savedCourse.rating ?? 0,
            studentsCount: savedCourse.studentsCount ?? 0,
            isFeatured: Boolean(savedCourse.isFeatured),
            createdAt: '',
        };
    }
    async ensureLessonOwnedByInstructor(lessonId, instructorId) {
        const lesson = await this.lessonsRepo.findOne({
            where: { id: lessonId },
            relations: { course: { instructor: true } },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (lesson.course?.instructor?.id !== instructorId) {
            throw new common_1.BadRequestException('Not your lesson');
        }
        return lesson;
    }
    async saveLessonVideoUrl(lessonId, videoUrl) {
        const lesson = await this.lessonsRepo.findOne({ where: { id: lessonId } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        lesson.videoUrl = videoUrl;
        await this.lessonsRepo.save(lesson);
    }
};
exports.InstructorService = InstructorService;
exports.InstructorService = InstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(2, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InstructorService);
//# sourceMappingURL=instructor.service.js.map