import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtUser = {
  userId: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUser | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    return request.user;
  },
);
