import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Roles } from '../common/auth/roles.decorator';
import { RolesGuard } from '../common/auth/roles.guard';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { UserRole } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Course) private readonly coursesRepo: Repository<Course>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
    private readonly auth: AuthService,
  ) {}

  @Get('analytics')
  async analytics() {
    const totalUsers = await this.usersRepo.count();
    const totalCourses = await this.coursesRepo.count();
    const totalEnrollments = await this.enrollmentsRepo.count();
    const totalStudents = await this.usersRepo.count({ where: { role: UserRole.STUDENT } });
    const totalInstructors = await this.usersRepo.count({ where: { role: UserRole.INSTRUCTOR } });
    return {
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      totalEnrollments,
    };
  }

  @Get('courses')
  async courses() {
    const courses = await this.coursesRepo.find({ relations: { instructor: true } });
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

  @Get('users')
  async users() {
    const users = await this.usersRepo.find();
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role:
        u.role === 'ADMIN'
          ? 'admin'
          : u.role === 'INSTRUCTOR'
            ? 'instructor'
            : 'student',
      createdAt: '',
    }));
  }

  @Post('users/:userId/reset-password')
  async resetPassword(@Param('userId') userId: string, @Body() dto: ResetPasswordDto) {
    await this.auth.resetPassword(userId, dto.newPassword);
    return { success: true };
  }

  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.usersRepo.delete({ id: userId });
    return { success: true };
  }
}
