import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    const userId=1;
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId=1;
    return this.notesService.findOne(+id, userId);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId=1;
    return this.notesService.remove(+id, userId);
  }
}
