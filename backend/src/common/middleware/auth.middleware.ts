import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    const token = (req.headers['authorization'] as string).split(' ')[1];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.prismaService.login.findUnique({
      where: {
        user_id: payload.user_id,
      },
    });

    if (user) {
      req.user = user;
    }

    next();
  }
}
