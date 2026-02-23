import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { JwtUser } from './current-user.decorator';

@Injectable()
export class ApprovedInstructorGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: JwtUser }>();
    const user = request.user;
    if (!user) throw new ForbiddenException('Missing user context');

    if (user.role !== 'instructor') return true;

    const dbUser = await this.usersRepo.findOne({ where: { id: user.userId } });
    if (!dbUser) throw new ForbiddenException('User not found');

    // Default to approved for legacy data unless explicitly false.
    if (dbUser.role === UserRole.INSTRUCTOR && dbUser.isApproved === false) {
      throw new ForbiddenException(
        'Instructor account pending admin approval. Please try again after approval.',
      );
    }

    return true;
  }
}
