import { IsDefined, IsString } from 'class-validator';

export class AuthDto {
  @IsDefined({ message: 'Email is required' })
  @IsString({ message: 'Email should be string' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString({ message: 'Password should be string' })
  password: string;
}
