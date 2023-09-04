import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll() {
    const userId=1;
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId=1;
    return this.cardsService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = 1;
    return this.cardsService.remove(+id, userId);
  }
}
