import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  findByEmail(email: string) {
    return this.prisma.users.findOne({
      where: {email}
  })
  }
  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto
    })
  }
} 
