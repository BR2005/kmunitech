import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Enrollment } from './entities/enrollment.entity';
import { UnilinkLead } from './entities/unilink-lead.entity';
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
import { HealthController } from './health.controller';
import { UnilinkController } from './unilink/unilink.controller';
import { UnilinkService } from './unilink/unilink.service';
import { PublicController } from './public/public.controller';
import { PublicService } from './public/public.service';

@Module({
  imports: [
    // Datastore: PostgreSQL
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const databaseUrl = (process.env.DATABASE_URL || '').trim();
        const useSsl = (process.env.DB_SSL || '').toLowerCase() === 'true';
        const sslConfig = useSsl ? { ssl: { rejectUnauthorized: false } } : {};

        return {
          type: 'postgres' as const,
          ...(databaseUrl
            ? {
                url: databaseUrl,
              }
            : {
                host: process.env.DB_HOST || 'localhost',
                port: +(process.env.DB_PORT || 5432),
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASS || 'postgres',
                database: process.env.DB_NAME || 'kmunitech',
              }),
          ...sslConfig,
          entities: [User, Course, Lesson, Enrollment, UnilinkLead],
          synchronize: true,
          retryAttempts: 10,
          retryDelay: 3000,
          extra: {
            connectionTimeoutMillis: 10000,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([User, Course, Lesson, Enrollment, UnilinkLead]),
    AuthModule,
  ],
  controllers: [
    HealthController,
    AuthController,
    CoursesController,
    StudentController,
    InstructorController,
    AdminController,
    MediaController,
    UnilinkController,
    PublicController,
  ],
  providers: [
    AuthService,
    CoursesService,
    StudentService,
    InstructorService,
    RolesGuard,
    AdminSeeder,
    UnilinkService,
    PublicService,
  ],
})
export class AppModule {}
