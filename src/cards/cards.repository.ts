import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsRepository {

  constructor(private readonly prisma: PrismaService) { }

  async create(createCardDto: CreateCardDto) {
    return await this.prisma.cards.create({
      data: CreateCardDto
    })
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.cards.find({
      where: {
        userId,
      },
    });
  }

  async findByTitle(userId: number, cardNum: number) {
    return await this.prisma.cards.findOne({
      where: {
        userId,
        cardNum,
      }
  })
  }
  
  async findOneByIdAndUserId(userId: number, id: number) {
    return await this.prisma.cards.findOne({
      where: {
        id,
        userId,
      }
  })
  }
  async findOneById(id: number) {
    return await this.prisma.cards.findOne({
      where: {
        id,
      }
  })
  }

  async remove(id: number) {
    return await this.prisma.cards.delete({
      where: {
        id,
      },
    });
  }
}
