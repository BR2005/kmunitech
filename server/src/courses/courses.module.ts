import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Lesson])],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule { }
