import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../entities/enrollment.entity';

export type EnrollmentDTO = {
  id: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  instructorName: string;
  progress: number;
  enrolledAt?: string;
  completedAt?: string | null;
};

export type ActivityDTO = {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
};

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
  ) {}

  async listEnrollments(studentId: string): Promise<EnrollmentDTO[]> {
    const enrollments = await this.enrollmentsRepo.find({
      where: { student: { id: studentId } },
      relations: { course: { instructor: true }, student: true },
    });
    return enrollments.map((e) => ({
      id: e.id,
      courseId: e.course.id,
      courseTitle: e.course.title,
      courseThumbnail: e.course.thumbnail ?? undefined,
      instructorName: e.course.instructor?.name ?? 'Unknown',
      progress: e.progress ?? 0,
      enrolledAt: '',
      completedAt: null,
    }));
  }

  async updateProgress(
    studentId: string,
    enrollmentId: string,
    progress: number,
  ): Promise<EnrollmentDTO> {
    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }
    const enrollment = await this.enrollmentsRepo.findOne({
      where: { id: enrollmentId },
      relations: { student: true, course: { instructor: true } },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.student.id !== studentId) {
      throw new BadRequestException('Not your enrollment');
    }
    enrollment.progress = progress;
    const saved = await this.enrollmentsRepo.save(enrollment);
    return {
      id: saved.id,
      courseId: saved.course.id,
      courseTitle: saved.course.title,
      courseThumbnail: saved.course.thumbnail ?? undefined,
      instructorName: saved.course.instructor?.name ?? 'Unknown',
      progress: saved.progress ?? 0,
      enrolledAt: '',
      completedAt: progress >= 100 ? new Date().toISOString() : null,
    };
  }

  async listActivities(studentId: string): Promise<ActivityDTO[]> {
    const enrollments = await this.listEnrollments(studentId);
    const now = new Date().toISOString();
    return enrollments.slice(0, 10).map((e) => ({
      id: `enroll-${e.id}`,
      type: e.progress >= 100 ? 'completion' : 'enrollment',
      title: e.progress >= 100 ? 'Course completed' : 'Enrolled in course',
      description: e.courseTitle,
      timestamp: now,
    }));
  }
}
