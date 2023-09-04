import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import Cryptr from 'cryptr';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  private readonly cryptr: Cryptr;

  constructor(private readonly repository: CardsRepository) {}

  async create(createCardDto: CreateCardDto) {
    const {userId, cardNum, cardName, cardSeg, cardDate, isVirtual, password} = createCardDto;
    
    if (!cardNum || !cardName || !cardSeg || !cardDate || !isVirtual) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }
    //pegar o userId
    const existCard = await this.repository.findByTitle(userId, cardNum);
    if (existCard) throw new HttpException("Card already exist", HttpStatus.CONFLICT);
     //para criptografar senha
    const cryptPassword = this.cryptr.encrypt(password);
    const cryptCardSeg = this.cryptr.encrypt(cardSeg);
    const newCard = await this.repository.create({
      userId,
      cardNum,
      cardName,
      cardSeg: cryptCardSeg,
      password: cryptPassword, 
      cardDate,
      isVirtual,
    });
    return this.repository.create(newCard);
  }

  async findAll(userId: number) {
    const cards = await this.repository.findAllByUserId(userId);

    return cards;
  }

  async findOne(userId: number, id: number) {
    const cardId = await this.repository.findOneById(id); 
    if (!cardId) {
      throw new HttpException('Card is not exist', HttpStatus.NOT_FOUND);
    }
    const card = await this.repository.findOneByIdAndUserId(userId, id);
    if (!card) {
      throw new HttpException('Card is confidential', HttpStatus.FORBIDDEN);
    }
    return card;
  }

  async remove(userId: number, id: number) {
    const cardId = await this.repository.findOneById(id); 
    if (!cardId) {
      throw new HttpException('Card is not exist', HttpStatus.NOT_FOUND);
    }
    const card = await this.repository.findOneByIdAndUserId(userId, id);
    if (!card) {
      throw new HttpException('Card is confidential', HttpStatus.FORBIDDEN);
    }
    return await this.repository.remove(card.id);
  }
}
