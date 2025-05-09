import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    const { email, password } = body;
    return await this.authService.register(email, password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const { email, password } = body;
    const { accessToken, userWithoutPassword } = await this.authService.login(
      email,
      password,
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
    return res.send(userWithoutPassword);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    return res.send({ message: 'Logged out successfully' });
  }
}
