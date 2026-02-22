import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnilinkLead } from '../entities/unilink-lead.entity';
import { RegisterUnilinkDto } from './dto/register-unilink.dto';

@Injectable()
export class UnilinkService {
  constructor(
    @InjectRepository(UnilinkLead)
    private readonly leadsRepo: Repository<UnilinkLead>,
  ) {}

  async register(dto: RegisterUnilinkDto) {
    const lead = this.leadsRepo.create({
      name: dto.name.trim(),
      phone: dto.phone.trim(),
    });

    const saved = await this.leadsRepo.save(lead);
    return { success: true, id: saved.id };
  }
}
