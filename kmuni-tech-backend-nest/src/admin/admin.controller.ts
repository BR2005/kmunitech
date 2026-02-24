import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Roles } from '../common/auth/roles.decorator';
import { RolesGuard } from '../common/auth/roles.guard';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { UserRole } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UnilinkEventsService } from '../unilink-events/unilink-events.service';
import { CreateUnilinkEventDto } from '../unilink-events/dto/create-unilink-event.dto';
import { UpdateUnilinkEventDto } from '../unilink-events/dto/update-unilink-event.dto';

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
    private readonly unilinkEvents: UnilinkEventsService,
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
      isApproved: u.role === 'INSTRUCTOR' ? Boolean(u.isApproved) : true,
      createdAt: '',
    }));
  }

  @Get('instructors/pending')
  async pendingInstructors() {
    const users = await this.usersRepo.find({
      where: { role: UserRole.INSTRUCTOR, isApproved: false },
    });
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: 'instructor',
      isApproved: false,
      createdAt: '',
    }));
  }

  @Post('instructors/:userId/approve')
  async approveInstructor(@Param('userId') userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');
    if (user.role !== UserRole.INSTRUCTOR) {
      throw new BadRequestException('User is not an instructor');
    }
    user.isApproved = true;
    await this.usersRepo.save(user);
    return { success: true };
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

  @Get('unilink-events')
  async listUnilinkEvents() {
    return this.unilinkEvents.listAll();
  }

  @Post('unilink-events')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => cb(null, 'uploads'),
        filename: (_req: any, file: any, cb: any) => {
          const safeExt = extname(file.originalname || '') || '.png';
          cb(null, `unilink-event-${Date.now()}${safeExt}`);
        },
      }),
    }),
  )
  async createUnilinkEvent(
    @Body() dto: CreateUnilinkEventDto,
    @UploadedFile() poster: any,
  ) {
    if (!poster) throw new BadRequestException('Poster image is required');
    if (poster.mimetype && typeof poster.mimetype === 'string' && !poster.mimetype.startsWith('image/')) {
      throw new BadRequestException('Poster must be an image');
    }
    const urlPath = `/uploads/${poster.filename}`;
    return this.unilinkEvents.create({ title: dto.title, status: dto.status, posterUrl: urlPath });
  }

  @Patch('unilink-events/:id')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => cb(null, 'uploads'),
        filename: (_req: any, file: any, cb: any) => {
          const safeExt = extname(file.originalname || '') || '.png';
          cb(null, `unilink-event-${Date.now()}${safeExt}`);
        },
      }),
    }),
  )
  async updateUnilinkEvent(
    @Param('id') id: string,
    @Body() dto: UpdateUnilinkEventDto,
    @UploadedFile() poster: any,
  ) {
    if (poster?.mimetype && typeof poster.mimetype === 'string' && !poster.mimetype.startsWith('image/')) {
      throw new BadRequestException('Poster must be an image');
    }
    const posterUrl = poster ? `/uploads/${poster.filename}` : undefined;
    return this.unilinkEvents.update(id, { title: dto.title, status: dto.status, posterUrl });
  }
}
