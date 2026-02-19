import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Roles } from '../common/auth/roles.decorator';
import { RolesGuard } from '../common/auth/roles.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { InstructorService } from './instructor.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('instructor')
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructors: InstructorService) {}

  @Get('courses')
  courses(@CurrentUser() user: JwtUser) {
    return this.instructors.listCourses(user.userId);
  }

  @Get('analytics')
  analytics(@CurrentUser() user: JwtUser) {
    return this.instructors.analytics(user.userId);
  }

  @Post('courses')
  createCourse(@CurrentUser() user: JwtUser, @Body() dto: CreateCourseDto) {
    return this.instructors.createCourse(user.userId, dto);
  }

  @Post('lessons/:lessonId/video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req: any, _file: any, cb: any) => cb(null, 'uploads'),
        filename: (_req: any, file: any, cb: any) => {
          const safeExt = extname(file.originalname || '') || '.bin';
          cb(null, `lesson-${Date.now()}${safeExt}`);
        },
      }),
    }),
  )
  async uploadVideo(
    @CurrentUser() user: JwtUser,
    @Param('lessonId') lessonId: string,
    @UploadedFile() file: any,
  ) {
    await this.instructors.ensureLessonOwnedByInstructor(lessonId, user.userId);
    const urlPath = `/uploads/${file.filename}`;
    await this.instructors.saveLessonVideoUrl(lessonId, urlPath);
    return { success: true, url: urlPath };
  }
}
