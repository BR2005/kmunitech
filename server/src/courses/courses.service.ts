import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @InjectRepository(Lesson)
        private lessonsRepository: Repository<Lesson>,
    ) { }

    findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: ['instructor'] });
    }

    findOne(id: string): Promise<Course | null> {
        return this.coursesRepository.findOne({ where: { id }, relations: ['instructor', 'lessons'] });
    }

    create(course: Partial<Course>): Promise<Course> {
        return this.coursesRepository.save(course);
    }

    async addLesson(courseId: string, lesson: Partial<Lesson>): Promise<Lesson> {
        // In a real app, verify course exists
        const newLesson = this.lessonsRepository.create({
            ...lesson,
            course: { id: courseId } as unknown as Course
        });
        return this.lessonsRepository.save(newLesson);
    }
}
