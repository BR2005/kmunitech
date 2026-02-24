import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnilinkEvent, UnilinkEventStatus } from '../entities/unilink-event.entity';

@Injectable()
export class UnilinkEventsService {
  constructor(
    @InjectRepository(UnilinkEvent)
    private readonly eventsRepo: Repository<UnilinkEvent>,
  ) {}

  async listAll() {
    return this.eventsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async listByStatus(status: UnilinkEventStatus) {
    return this.eventsRepo.find({ where: { status }, order: { createdAt: 'DESC' } });
  }

  async listPublicGrouped() {
    const [upcoming, finished] = await Promise.all([
      this.listByStatus('upcoming'),
      this.listByStatus('finished'),
    ]);

    return {
      upcoming: upcoming.map(this.toPublicDto),
      finished: finished.map(this.toPublicDto),
    };
  }

  async create(input: { title: string; status: UnilinkEventStatus; posterUrl: string }) {
    const title = input.title.trim();
    if (!title) throw new BadRequestException('Title is required');
    if (!input.posterUrl) throw new BadRequestException('Poster is required');

    const created = this.eventsRepo.create({
      title,
      status: input.status,
      posterUrl: input.posterUrl,
    });

    return this.eventsRepo.save(created);
  }

  async update(
    id: string,
    changes: { title?: string; status?: UnilinkEventStatus; posterUrl?: string },
  ) {
    const event = await this.eventsRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');

    if (typeof changes.title === 'string') {
      const title = changes.title.trim();
      if (!title) throw new BadRequestException('Title is required');
      event.title = title;
    }

    if (typeof changes.status === 'string') {
      event.status = changes.status;
    }

    if (typeof changes.posterUrl === 'string') {
      event.posterUrl = changes.posterUrl;
    }

    return this.eventsRepo.save(event);
  }

  private toPublicDto = (event: UnilinkEvent) => ({
    id: event.id,
    title: event.title,
    status: event.status,
    posterUrl: event.posterUrl,
  });
}
