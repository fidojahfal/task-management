import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthRegisterRequest, AuthResponse } from '../model/auth.model';
import { ValidationService } from '../common/validation/validation.service';
import { AuthValidation } from './auth.validation';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async register(request: AuthRegisterRequest): Promise<AuthResponse> {
    const registerRequest: AuthRegisterRequest =
      this.validationService.validate(AuthValidation.REGISTER, request);

    const checkUsername = await this.prismaService.login.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (checkUsername > 0) {
      throw new HttpException('Username already exist!', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 13);

    const register = await this.prismaService.login.create({
      data: registerRequest,
    });

    return {
      user_id: register.user_id,
      name: register.name,
      username: register.username,
    };
  }
}
