import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly coursesRepo: Repository<Course>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getHomeStats() {
    const [expertCourses, proInstructors] = await Promise.all([
      this.coursesRepo.count(),
      this.usersRepo.count({ where: { role: UserRole.INSTRUCTOR } }),
    ]);

    const studentsEnrolledRaw = await this.enrollmentsRepo
      .createQueryBuilder('e')
      .select('COUNT(DISTINCT e.studentId)', 'count')
      .getRawOne<{ count: string }>();

    const avgRatingRaw = await this.coursesRepo
      .createQueryBuilder('c')
      .select('AVG(c.rating)', 'avg')
      .getRawOne<{ avg: string | null }>();

    const studentsEnrolled = Number(studentsEnrolledRaw?.count ?? 0);
    const avgRating = Number(avgRatingRaw?.avg ?? 0);
    const satisfactionRate = avgRating > 0 ? Math.round((avgRating / 5) * 100) : null;

    return {
      studentsEnrolled,
      expertCourses,
      satisfactionRate,
      proInstructors,
      updatedAt: new Date().toISOString(),
    };
  }
}
