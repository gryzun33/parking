import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async register(email: string, password: string): Promise<void> {
    const hashedPassword = await this.hashPassword(password);
    try {
      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new InternalServerErrorException(
        `Error creating user: ${error.message}`,
      );
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Authentication failed');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Authentication failed');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async generateAccessToken(userId: string): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
    const expiresIn = this.configService.get<string>('TOKEN_EXPIRE_TIME');

    return this.jwtService.signAsync({ userId }, { secret, expiresIn });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>('CRYPT_SALT');
    const salt = await bcrypt.genSalt(Number(saltRounds));
    return await bcrypt.hash(password, salt);
  }
}
