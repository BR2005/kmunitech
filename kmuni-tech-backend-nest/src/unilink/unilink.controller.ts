import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUnilinkDto } from './dto/register-unilink.dto';
import { UnilinkService } from './unilink.service';

@Controller('unilink')
export class UnilinkController {
  constructor(private readonly unilink: UnilinkService) {}

  @Post('register')
  register(@Body() dto: RegisterUnilinkDto) {
    return this.unilink.register(dto);
  }
}
