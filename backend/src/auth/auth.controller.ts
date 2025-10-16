import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthResponse,
} from '../model/auth.model';
import { WebResponse } from '../model/web.model';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() request: AuthRegisterRequest,
  ): Promise<WebResponse<AuthResponse>> {
    const result = await this.authService.register(request);

    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() request: AuthLoginRequest,
  ): Promise<WebResponse<AuthResponse>> {
    const result = await this.authService.login(request);

    return {
      data: result,
    };
  }
}
