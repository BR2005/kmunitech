import { Body, Controller, ForbiddenException, Get, NotFoundException, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('users')
    async listUsers(@Request() req: any) {
        if (req.user?.role !== 'admin') {
            throw new ForbiddenException('Admin access required');
        }
        return this.usersService.findAllSafe();
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('users/:id/password')
    async resetUserPassword(
        @Request() req: any,
        @Body() body: { password?: string },
    ) {
        if (req.user?.role !== 'admin') {
            throw new ForbiddenException('Admin access required');
        }

        const password = (body?.password ?? '').trim();
        if (!password || password.length < 6) {
            throw new ForbiddenException('Password must be at least 6 characters');
        }

        const userId = req.params?.id as string;
        const updated = await this.usersService.setPasswordById(userId, password);
        if (!updated) {
            throw new NotFoundException('User not found');
        }

        return { ok: true };
    }
}
