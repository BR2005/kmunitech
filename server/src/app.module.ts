import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Course } from './courses/course.entity';
import { Lesson } from './courses/lesson.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = Number(configService.get<string>('DB_PORT') ?? '5432');
        const dbUser = configService.get<string>('DB_USER');
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');

        const enableSsl = (configService.get<string>('DB_SSL') ?? '').toLowerCase() === 'true' ||
          (configService.get<string>('NODE_ENV') ?? '').toLowerCase() === 'production';

        if (!databaseUrl && !(dbHost && dbUser && dbName)) {
          throw new Error(
            'Database config missing. Set DATABASE_URL (recommended) or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME for Postgres.',
          );
        }

        return {
          type: 'postgres',
          url: databaseUrl,
          host: databaseUrl ? undefined : dbHost,
          port: databaseUrl ? undefined : dbPort,
          username: databaseUrl ? undefined : dbUser,
          password: databaseUrl ? undefined : dbPassword,
          database: databaseUrl ? undefined : dbName,
          entities: [User, Course, Lesson, Enrollment],
          synchronize: true,
          autoLoadEntities: true,
          ssl: enableSsl ? { rejectUnauthorized: false } : undefined,
        } as any;
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    AdminModule,
  ],
})
export class AppModule { }
