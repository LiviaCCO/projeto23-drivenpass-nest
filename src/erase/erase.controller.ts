import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EraseService } from './erase.service';

@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @Delete(':userId')
  remove(@Param('userId') userId: number, password: string) {
    return this.eraseService.remove(+userId, password);
  }
}
