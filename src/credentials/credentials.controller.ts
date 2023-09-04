import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { validate } from 'class-validator';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(@Body() createCredentialDto: CreateCredentialDto) {
    const error = await validate(createCredentialDto);

    if (error.length > 0) {
      // Se houver erros de validação: (Bad Request)
      throw new HttpException(
        { message: 'validation error', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.credentialsService.create(createCredentialDto);
  }

  @Get()
  findAll() {
    const userId=1;
    return this.credentialsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId=1;
    return this.credentialsService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId=1;
    return this.credentialsService.remove(+id, userId);
  }
}
