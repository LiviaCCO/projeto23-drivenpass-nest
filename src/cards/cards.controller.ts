import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user) {
    const userId=user;
    return this.cardsService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() user, @Param('id') id: string) {
    const userId=user;
    return this.cardsService.findOne(+id, userId);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    const userId = user;
    return this.cardsService.remove(+id, userId);
  }
}
