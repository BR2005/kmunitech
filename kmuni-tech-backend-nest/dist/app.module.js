"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./entities/user.entity");
const course_entity_1 = require("./entities/course.entity");
const lesson_entity_1 = require("./entities/lesson.entity");
const enrollment_entity_1 = require("./entities/enrollment.entity");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const courses_controller_1 = require("./courses/courses.controller");
const courses_service_1 = require("./courses/courses.service");
const student_controller_1 = require("./student/student.controller");
const student_service_1 = require("./student/student.service");
const instructor_controller_1 = require("./instructor/instructor.controller");
const instructor_service_1 = require("./instructor/instructor.service");
const admin_controller_1 = require("./admin/admin.controller");
const media_controller_1 = require("./media/media.controller");
const roles_guard_1 = require("./common/auth/roles.guard");
const admin_seeder_1 = require("./seed/admin.seeder");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Datastore: PostgreSQL
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    return {
                        type: 'postgres',
                        host: process.env.DB_HOST || 'localhost',
                        port: +(process.env.DB_PORT || 5432),
                        username: process.env.DB_USER || 'postgres',
                        password: process.env.DB_PASS || 'postgres',
                        database: process.env.DB_NAME || 'kmunitech',
                        entities: [user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment],
                        synchronize: true,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment]),
            auth_module_1.AuthModule,
        ],
        controllers: [
            auth_controller_1.AuthController,
            courses_controller_1.CoursesController,
            student_controller_1.StudentController,
            instructor_controller_1.InstructorController,
            admin_controller_1.AdminController,
            media_controller_1.MediaController,
        ],
        providers: [
            auth_service_1.AuthService,
            courses_service_1.CoursesService,
            student_service_1.StudentService,
            instructor_service_1.InstructorService,
            roles_guard_1.RolesGuard,
            admin_seeder_1.AdminSeeder,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map