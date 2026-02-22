import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly pub: PublicService) {}

  @Get('home-stats')
  homeStats() {
    return this.pub.getHomeStats();
  }
}
