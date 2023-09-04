import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialDto } from './dto/create-credential.dto';


@Injectable()
export class CredentialsRepository {

  constructor(private readonly prisma: PrismaService) { }

  async findByTitleNameLabel(userId: number, title: string, name: string, label: string) {
    
    return await this.prisma.credentials.findOne({
      where: {
        userId,
        title,
        name,
        label,
      }
  })
  }

  async create(createCredentialDto: CreateCredentialDto) {
    return await this.prisma.credentials.create({
      data: createCredentialDto
    })
  } 

  async findAllByUserId(userId: number) {
    return await this.prisma.credentials.find({
      where: {
        userId,
      },
    });
  }

  async findOneByIdAndUserId(id: number, userId: number) {
    return await this.prisma.credentials.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.credentials.delete({
      where: {
        id,
      },
    });
  }
}


