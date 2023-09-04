import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { validate } from 'class-validator';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user) {
    const userId=user;
    return this.credentialsService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() user, @Param('id') id: string) {
    const userId=user;
    return this.credentialsService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    const userId=user;
    return this.credentialsService.remove(+id, userId);
  }
}
