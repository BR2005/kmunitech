import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';
import { UnilinkEventsService } from '../unilink-events/unilink-events.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly pub: PublicService,
    private readonly unilinkEvents: UnilinkEventsService,
  ) {}

  @Get('home-stats')
  homeStats() {
    return this.pub.getHomeStats();
  }

  @Get('unilink-events')
  unilinkEventsList() {
    return this.unilinkEvents.listPublicGrouped();
  }
}
