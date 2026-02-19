import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Roles } from '../common/auth/roles.decorator';
import { RolesGuard } from '../common/auth/roles.guard';
import { CurrentUser, JwtUser } from '../common/auth/current-user.decorator';
import { StudentService } from './student.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('student')
@Controller('student')
export class StudentController {
  constructor(private readonly students: StudentService) {}

  @Get('courses')
  courses(@CurrentUser() user: JwtUser) {
    return this.students.listEnrollments(user.userId);
  }

  @Put('enrollments/:id/progress')
  progress(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.students.updateProgress(user.userId, id, dto.progress);
  }

  @Get('activities')
  activities(@CurrentUser() user: JwtUser) {
    return this.students.listActivities(user.userId);
  }
}
