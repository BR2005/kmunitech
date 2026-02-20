import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Enrollment } from './entities/enrollment.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { InstructorController } from './instructor/instructor.controller';
import { InstructorService } from './instructor/instructor.service';
import { AdminController } from './admin/admin.controller';
import { MediaController } from './media/media.controller';
import { RolesGuard } from './common/auth/roles.guard';
import { AdminSeeder } from './seed/admin.seeder';

@Module({
  imports: [
    // Datastore: PostgreSQL
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const databaseUrl = (process.env.DATABASE_URL || '').trim();
        const useSsl = (process.env.DB_SSL || '').toLowerCase() === 'true';

        return {
          type: 'postgres' as const,
          ...(databaseUrl
            ? {
                url: databaseUrl,
                ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
              }
            : {
                host: process.env.DB_HOST || 'localhost',
                port: +(process.env.DB_PORT || 5432),
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASS || 'postgres',
                database: process.env.DB_NAME || 'kmunitech',
              }),
          entities: [User, Course, Lesson, Enrollment],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Course, Lesson, Enrollment]),
    AuthModule,
  ],
  controllers: [
    AuthController,
    CoursesController,
    StudentController,
    InstructorController,
    AdminController,
    MediaController,
  ],
  providers: [
    AuthService,
    CoursesService,
    StudentService,
    InstructorService,
    RolesGuard,
    AdminSeeder,
  ],
})
export class AppModule {}
