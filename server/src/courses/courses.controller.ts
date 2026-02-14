import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createCourseDto: any, @Request() req) {
        // Append instructor
        return this.coursesService.create({ ...createCourseDto, instructor: { id: req.user.userId } } as any);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/lessons')
    addLesson(@Param('id') id: string, @Body() createLessonDto: any) {
        return this.coursesService.addLesson(id, createLessonDto);
    }
}
