import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @UseGuards(AuthGuard)
  @Delete(':userId')
  remove(@User() user, @Param('userId') userId: number, password: string) {
    return this.eraseService.remove(+userId, password);
  }
}
