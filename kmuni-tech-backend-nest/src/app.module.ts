import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Course } from './entities/course.entity';
import { Lesson } from './entities/lesson.entity';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [
    // Datastore selection: prefer explicit DB_TYPE or fall back to SQLite for local
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const useSqlite =
          process.env.DB_TYPE === 'sqlite' || !process.env.DB_HOST;
        if (useSqlite) {
          return {
            type: 'sqlite' as const,
            database: process.env.DB_SQLITE_FILE || ':memory:',
            entities: [User, Course, Lesson, Enrollment],
            synchronize: true,
          };
        }
        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST || 'localhost',
          port: +(process.env.DB_PORT || 5432),
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASS || 'postgres',
          database: process.env.DB_NAME || 'kmunitech',
          entities: [User, Course, Lesson, Enrollment],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Course, Lesson, Enrollment]),
    AuthModule,
  ],
})
export class AppModule {}
