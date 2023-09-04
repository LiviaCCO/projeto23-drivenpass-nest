import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EraseRepository {
  cryptr: any;
  constructor(private readonly prisma: PrismaService) { }

  async verifyPassword(userId: number, password: string) {
    const user = await this.prisma.users.findOne({
      where: {
        id: userId,
      },
    });
    // Descriptografando a senha.
    const userDecryptPassword = this.cryptr.decrypt(user.password);

    if(password!==userDecryptPassword) return null;
    return user;
  }
  async deleteCards(userId: number) {
    return await this.prisma.cards.delete({
        where: {
          userId,
        },
      });
  }
  
  async deleteNotes(userId: number) {
    return await this.prisma.notes.delete({
      where: {
        userId,
      },
    });
  }
  async deleteCrendentials(userId: number) {
    return await this.prisma.credentials.delete({
      where: {
        userId,
      },
    });
  }
  async deleteUser(userId: number) {
    return await this.prisma.users.delete({
      where: {
        userId,
      },
    });
  }
}
