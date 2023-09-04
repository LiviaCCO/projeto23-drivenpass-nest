import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorators/user.decorator';


@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  async create(@User() user, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user) {
    const userId=user;
    return this.notesService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() user, @Param('id') id: string) {
    const userId=user;
    return this.notesService.findOne(+id, userId);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    const userId=user;
    return this.notesService.remove(+id, userId);
  }
}
