import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import SignUpDto from '../auth/dto/signup.dto';
import SignInDto from '../auth/dto/signin.dto';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {

  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository) { }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersRepository.findByEmail(signUpDto.email);
    if (user) throw new ConflictException("Email already in use.")

    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException(`Email or password not valid.`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException(`Email or password not valid.`);

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const { id, email } = user;

    const token = this.jwtService.sign({ email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { token }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

}