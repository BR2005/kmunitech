import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';
import { Lesson } from '../entities/lesson.entity';
import { Enrollment } from '../entities/enrollment.entity';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(
    @InjectRepository(Lesson) private readonly lessonsRepo: Repository<Lesson>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
  ) {}

  @Get('lessons/:lessonId/playback')
  async playback(@Param('lessonId') lessonId: string, @CurrentUser() user: JwtUser) {
    const lesson = await this.lessonsRepo.findOne({
      where: { id: lessonId },
      relations: { course: true },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (!lesson.videoUrl) throw new NotFoundException('No video uploaded');

    const isInstructorOrAdmin = user.role === 'instructor' || user.role === 'admin';
    if (!lesson.isPreview && !isInstructorOrAdmin) {
      const enrollment = await this.enrollmentsRepo.findOne({
        where: { student: { id: user.userId }, course: { id: lesson.course.id } },
        relations: { student: true, course: true },
      });
      if (!enrollment) throw new NotFoundException('Not enrolled');
    }

    const base = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const url = lesson.videoUrl.startsWith('http')
      ? lesson.videoUrl
      : `${base}${lesson.videoUrl}`;
    return { url };
  }
}
