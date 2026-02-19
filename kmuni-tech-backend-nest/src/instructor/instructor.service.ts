import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Lesson } from '../entities/lesson.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { User } from '../entities/user.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseDTO, CourseListDTO } from '../courses/courses.service';

type InstructorAnalyticsDTO = {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
};

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    @InjectRepository(Lesson) private readonly lessonsRepo: Repository<Lesson>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async listCourses(instructorId: string): Promise<CourseListDTO[]> {
    const courses = await this.coursesRepo.find({
      where: { instructor: { id: instructorId } },
      relations: { instructor: true },
    });
    return courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description ?? '',
      thumbnail: c.thumbnail ?? undefined,
      instructorId: c.instructor?.id,
      instructorName: c.instructor?.name ?? 'Unknown',
      price: c.price,
      level: c.level ?? 'beginner',
      category: c.category ?? 'web-dev',
      tags: c.tags ?? [],
      totalDuration: c.totalDuration ?? 0,
      rating: c.rating ?? 0,
      studentsCount: c.studentsCount ?? 0,
      isFeatured: Boolean(c.isFeatured),
      createdAt: '',
    }));
  }

  async analytics(instructorId: string): Promise<InstructorAnalyticsDTO> {
    const courses = await this.coursesRepo.find({
      where: { instructor: { id: instructorId } },
    });
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, c) => sum + (c.studentsCount ?? 0), 0);
    const averageRating = totalCourses
      ? courses.reduce((sum, c) => sum + (c.rating ?? 0), 0) / totalCourses
      : 0;
    return { totalCourses, totalStudents, averageRating };
  }

  async createCourse(instructorId: string, dto: CreateCourseDto): Promise<CourseDTO> {
    const instructor = await this.usersRepo.findOne({ where: { id: instructorId } });
    if (!instructor) throw new BadRequestException('Instructor not found');

    const totalDuration = (dto.lessons ?? []).reduce(
      (sum, l) => sum + (l.duration ?? 0),
      0,
    );

    const course = this.coursesRepo.create({
      title: dto.title,
      description: dto.description,
      thumbnail: dto.thumbnail ?? undefined,
      price: dto.price,
      level: dto.level,
      category: dto.category,
      tags: dto.tags ?? [],
      totalDuration,
      rating: 0,
      studentsCount: 0,
      isFeatured: false,
      instructor,
    });
    const savedCourse = await this.coursesRepo.save(course);

    const lessons = (dto.lessons ?? []).map((l) =>
      this.lessonsRepo.create({
        title: l.title,
        description: l.description ?? undefined,
        duration: l.duration,
        order: l.order,
        isPreview: Boolean(l.isPreview),
        videoUrl: l.videoUrl ?? undefined,
        content: l.content ?? undefined,
        course: savedCourse,
      }),
    );
    const savedLessons = await this.lessonsRepo.save(lessons);

    return {
      id: savedCourse.id,
      title: savedCourse.title,
      description: savedCourse.description ?? '',
      thumbnail: savedCourse.thumbnail ?? undefined,
      instructorId: instructor.id,
      instructorName: instructor.name,
      price: savedCourse.price,
      level: savedCourse.level ?? 'beginner',
      category: savedCourse.category ?? 'web-dev',
      tags: savedCourse.tags ?? [],
      lessons: savedLessons
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
      totalDuration: savedCourse.totalDuration ?? 0,
      rating: savedCourse.rating ?? 0,
      studentsCount: savedCourse.studentsCount ?? 0,
      isFeatured: Boolean(savedCourse.isFeatured),
      createdAt: '',
    };
  }

  async ensureLessonOwnedByInstructor(lessonId: string, instructorId: string): Promise<Lesson> {
    const lesson = await this.lessonsRepo.findOne({
      where: { id: lessonId },
      relations: { course: { instructor: true } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.course?.instructor?.id !== instructorId) {
      throw new BadRequestException('Not your lesson');
    }
    return lesson;
  }

  async saveLessonVideoUrl(lessonId: string, videoUrl: string): Promise<void> {
    const lesson = await this.lessonsRepo.findOne({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    lesson.videoUrl = videoUrl;
    await this.lessonsRepo.save(lesson);
  }
}
