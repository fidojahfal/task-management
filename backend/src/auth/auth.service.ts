import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthResponse,
} from '../model/auth.model';
import { ValidationService } from '../common/validation/validation.service';
import { AuthValidation } from './auth.validation';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private jwtService: JwtService,
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

  async login(request: AuthLoginRequest): Promise<AuthResponse> {
    const loginRequest: AuthLoginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const findUser = await this.prismaService.login.findFirst({
      where: {
        username: loginRequest.username,
      },
    });

    if (!findUser) {
      throw new HttpException('Username or password is wrong!', 403);
    }

    const checkPassword = await bcrypt.compare(
      loginRequest.password,
      findUser.password,
    );

    if (!checkPassword) {
      throw new HttpException('Username or password is wrong!', 403);
    }

    const payload = { user_id: findUser.user_id, username: findUser.username };

    return {
      user_id: findUser.user_id,
      name: findUser.name,
      username: findUser.username,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
