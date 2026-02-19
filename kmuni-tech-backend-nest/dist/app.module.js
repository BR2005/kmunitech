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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Datastore selection: prefer explicit DB_TYPE or fall back to SQLite for local
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    const useSqlite = process.env.DB_TYPE === 'sqlite' || !process.env.DB_HOST;
                    if (useSqlite) {
                        return {
                            type: 'sqlite',
                            database: process.env.DB_SQLITE_FILE || ':memory:',
                            entities: [user_entity_1.User, course_entity_1.Course, lesson_entity_1.Lesson, enrollment_entity_1.Enrollment],
                            synchronize: true,
                        };
                    }
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
    })
], AppModule);
//# sourceMappingURL=app.module.js.map