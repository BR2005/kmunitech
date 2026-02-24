import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'node:fs';
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
    // Datastore: PostgreSQL
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const databaseUrl = (process.env.DATABASE_URL || '').trim();
        const dbHost = (process.env.DB_HOST || '').trim();
        const dbSslRaw = (process.env.DB_SSL || '').trim().toLowerCase();

        let parsedUrl: URL | undefined;
        if (!dbHost && databaseUrl) {
          try {
            parsedUrl = new URL(databaseUrl);
          } catch {
            // If parsing fails, we'll fall back to passing `url` through.
          }
        }

        const sslmode = (parsedUrl?.searchParams.get('sslmode') || '').trim().toLowerCase();
        const inferredUseSsl = sslmode.length > 0 ? sslmode !== 'disable' : true;
        const useSsl = dbSslRaw.length > 0 ? dbSslRaw === 'true' : inferredUseSsl;

        const rejectUnauthorizedRaw = (
          process.env.DB_SSL_REJECT_UNAUTHORIZED || ''
        )
          .trim()
          .toLowerCase();
        const inferredRejectUnauthorized =
          sslmode === 'verify-ca' || sslmode === 'verify-full' || sslmode === 'verify';
        const rejectUnauthorized =
          rejectUnauthorizedRaw.length > 0
            ? rejectUnauthorizedRaw === 'true'
            : inferredRejectUnauthorized;

        const dbSslCaInline = (process.env.DB_SSL_CA || '').trim();
        const dbSslCaPath = (process.env.DB_SSL_CA_PATH || '').trim();

        const sslOptions =
          useSsl === true
            ? {
                rejectUnauthorized,
                ...(dbSslCaInline
                  ? { ca: dbSslCaInline.replace(/\\n/g, '\n') }
                  : dbSslCaPath
                    ? { ca: fs.readFileSync(dbSslCaPath, 'utf8') }
                    : {}),
              }
            : undefined;

        return {
          type: 'postgres' as const,
          ...(dbHost
            ? {
                host: dbHost,
                port: +(process.env.DB_PORT || 5432),
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASS || 'postgres',
                database: process.env.DB_NAME || 'kmunitech',
              }
            : parsedUrl
              ? {
                  host: parsedUrl.hostname,
                  port: parsedUrl.port ? Number(parsedUrl.port) : 5432,
                  username: decodeURIComponent(parsedUrl.username),
                  password: decodeURIComponent(parsedUrl.password),
                  database: decodeURIComponent(parsedUrl.pathname.replace(/^\//, '')),
                }
              : databaseUrl
                ? {
                    url: databaseUrl,
                  }
              : {
                  host: 'localhost',
                  port: +(process.env.DB_PORT || 5432),
                  username: process.env.DB_USER || 'postgres',
                  password: process.env.DB_PASS || 'postgres',
                  database: process.env.DB_NAME || 'kmunitech',
                }),
          ...(useSsl ? { ssl: sslOptions } : {}),
          entities: [User, Course, Lesson, Enrollment, UnilinkLead],
          synchronize: true,
          retryAttempts: 10,
          retryDelay: 3000,
          extra: {
            connectionTimeoutMillis: 10000,
            ...(useSsl ? { ssl: sslOptions } : {}),
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
    ApprovedInstructorGuard,
    AdminSeeder,
    UnilinkService,
    PublicService,
  ],
})
export class AppModule {}
