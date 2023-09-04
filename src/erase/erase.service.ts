import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import { CardsRepository } from 'src/cards/cards.repository';
import { NotesRepository } from 'src/notes/notes.repository';
import { CredentialsRepository } from 'src/credentials/credentials.repository';

@Injectable()
export class EraseService {
  constructor(private readonly repository: EraseRepository) {}
  
  async remove(userId: number, password: string) {
    const passwordValid = await this.repository.verifyPassword(userId, password);
    if (!passwordValid) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }
    await this.repository.deleteCards(userId);
    await this.repository.deleteNotes(userId);
    await this.repository.deleteCrendentials(userId);
    return await this.repository.deleteUser(userId);
  }
}
