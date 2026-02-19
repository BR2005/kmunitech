import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { Lesson } from '../entities/lesson.entity';
import { User } from '../entities/user.entity';

export type CourseListDTO = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructorId?: string;
  instructorName: string;
  price: number | string;
  level: string;
  category: string;
  tags?: string[];
  totalDuration?: number;
  rating?: number;
  studentsCount?: number;
  isFeatured?: boolean;
  createdAt?: string;
};

export type LessonDTO = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  order?: number;
  isPreview?: boolean;
};

export type CourseDTO = CourseListDTO & { lessons?: LessonDTO[] };

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    @InjectRepository(Lesson) private readonly lessonsRepo: Repository<Lesson>,
  ) {}

  async listAll(): Promise<CourseListDTO[]> {
    const courses = await this.coursesRepo.find({ relations: { instructor: true } });
    return courses.map((c) => this.toCourseListDto(c));
  }

  async listFeatured(): Promise<CourseListDTO[]> {
    const courses = await this.coursesRepo.find({
      where: { isFeatured: true },
      relations: { instructor: true },
    });
    return courses.map((c) => this.toCourseListDto(c));
  }

  async getById(id: string): Promise<CourseDTO> {
    const course = await this.coursesRepo.findOne({
      where: { id },
      relations: { instructor: true, lessons: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    return {
      ...this.toCourseListDto(course),
      lessons: (course.lessons ?? [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description ?? undefined,
          duration: l.duration,
          order: l.order,
          isPreview: l.isPreview,
        })),
    };
  }

  async enroll(courseId: string, studentId: string): Promise<{ success: boolean }>{
    const course = await this.coursesRepo.findOne({
      where: { id: courseId },
      relations: { instructor: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    const student = await this.usersRepo.findOne({ where: { id: studentId } });
    if (!student) throw new BadRequestException('Student not found');

    const existing = await this.enrollmentsRepo.findOne({
      where: { course: { id: courseId }, student: { id: studentId } },
      relations: { course: true, student: true },
    });
    if (existing) return { success: true };

    const enrollment = this.enrollmentsRepo.create({
      course,
      student,
      progress: 0,
    });
    await this.enrollmentsRepo.save(enrollment);

    course.studentsCount = (course.studentsCount ?? 0) + 1;
    await this.coursesRepo.save(course);

    return { success: true };
  }

  private toCourseListDto(course: Course): CourseListDTO {
    return {
      id: course.id,
      title: course.title,
      description: course.description ?? '',
      thumbnail: course.thumbnail ?? undefined,
      instructorId: course.instructor?.id ?? undefined,
      instructorName: course.instructor?.name ?? 'Unknown',
      price: course.price,
      level: course.level ?? 'beginner',
      category: course.category ?? 'web-dev',
      tags: course.tags ?? [],
      totalDuration: course.totalDuration ?? 0,
      rating: course.rating ?? 0,
      studentsCount: course.studentsCount ?? 0,
      isFeatured: Boolean(course.isFeatured),
      createdAt: '',
    };
  }
}
