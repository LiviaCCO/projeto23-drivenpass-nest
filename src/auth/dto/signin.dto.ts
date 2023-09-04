import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
