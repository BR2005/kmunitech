import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Roles } from '../common/auth/roles.decorator';
import { RolesGuard } from '../common/auth/roles.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  list() {
    return this.courses.listAll();
  }

  @Get('featured')
  featured() {
    return this.courses.listFeatured();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.courses.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Post(':id/enroll')
  enroll(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.courses.enroll(id, user.userId);
  }
}
