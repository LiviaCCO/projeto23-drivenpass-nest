import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesRepository {

  constructor(private readonly prisma: PrismaService) { }

  async create(createNoteDto: CreateNoteDto) {
    return await this.prisma.notes.create({
      data: createNoteDto
    })
  }
  async findByTitle(userId: number, title: string) {
    return await this.prisma.notes.findOne({
      where: {
        userId,
        title,
      }})
  }
  async findOneById(id: number) {
    return await this.prisma.notes.findOne({
      where: {
        id,
      },
    });
  }
  async findAllByUserId(userId: number) {
    return await this.prisma.notes.find({
      where: {
        userId,
      },
    });
  }
  async findOneByIdAndUserId(userId: number, id: number) {
    return await this.prisma.notes.findOne({
      where: {
        id,
        userId,
      },
    });
  }
  async remove(id: number) {
    return await this.prisma.notes.delete({
      where: {
        id,
      },
    });
  }
  
}
