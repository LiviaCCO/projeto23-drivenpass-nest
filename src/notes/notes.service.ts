import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {

  constructor(private readonly repository: NotesRepository) { }

  async create(createNoteDto: CreateNoteDto) {
    const {userId, title, name, label, note} = createNoteDto;
    
    if (!title || !name || !label || !note) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }
    //pegar o userId
    const existNote = await this.repository.findByTitle(userId, title);
    
    if (existNote) throw new HttpException("Title already exists", HttpStatus.CONFLICT);

    return this.repository.create(createNoteDto);
  }

  async findAll(userId: number) {
    const notes = await this.repository.findAllByUserId(userId);
    if (!notes) throw new HttpException("Note not exist", HttpStatus.NOT_FOUND);

    return notes;
  }

  async findOne(userId: number, id: number) {
    const noteId = await this.repository.findOneById(id); 
    const note = await this.repository.findOneByIdAndUserId(userId, id);
    if (!note && noteId) {
      throw new HttpException('Note is confidential', HttpStatus.FORBIDDEN);
    }
    return note;
  }

  async remove(id: number, userId: number) {
    const note = await this.repository.findOneByIdAndUserId(id, userId);
    // se não existir
    if (!note) {
      throw new HttpException('Note is not exist', HttpStatus.NOT_FOUND);
    }
    return await this.repository.remove(note.id);
  }
}
