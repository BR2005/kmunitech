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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const lesson_entity_1 = require("./lesson.entity");
const enrollment_entity_1 = require("./enrollment.entity");
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Course.prototype, "totalDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "studentsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.coursesCreated),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (l) => l.course),
    __metadata("design:type", Array)
], Course.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (e) => e.course),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)('courses')
], Course);
//# sourceMappingURL=course.entity.js.map