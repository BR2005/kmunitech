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
import { ApprovedInstructorGuard } from './common/auth/approved-instructor.guard';
import { AdminSeeder } from './seed/admin.seeder';
import { HealthController } from './health.controller';
import { UnilinkController } from './unilink/unilink.controller';
import { UnilinkService } from './unilink/unilink.service';
import { PublicController } from './public/public.controller';
import { PublicService } from './public/public.service';

@Module({
  imports: [
    // Datastore: auto-detect — PostgreSQL in production, SQLite for local dev
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const databaseUrl = (process.env.DATABASE_URL || '').trim();
        const dbHost = (process.env.DB_HOST || '').trim();
        const usePostgres = Boolean(databaseUrl) || Boolean(dbHost);

        if (usePostgres) {
          // --- Production / staging: PostgreSQL ---
          const dbSslRaw = (process.env.DB_SSL || '').trim().toLowerCase();
          const useSsl =
            dbSslRaw.length > 0
              ? dbSslRaw === 'true'
              : Boolean(databaseUrl) || process.env.NODE_ENV === 'production';
          const sslConfig = useSsl ? { ssl: { rejectUnauthorized: false } } : {};

          return {
            type: 'postgres' as const,
            ...(databaseUrl
              ? { url: databaseUrl }
              : {
                host: process.env.DB_HOST,
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
            extra: { connectionTimeoutMillis: 10000 },
          };
        }

        // --- Local dev: SQLite (no Docker needed) ---
        return {
          type: 'sqlite' as const,
          database: 'kmunitech.sqlite',
          entities: [User, Course, Lesson, Enrollment, UnilinkLead],
          synchronize: true,
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
    ApprovedInstructorGuard,
    AdminSeeder,
    UnilinkService,
    PublicService,
  ],
})
export class AppModule { }
