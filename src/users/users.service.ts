import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly repository: UsersRepository) { }

  //deve fornecer um e-mail válido e uma senha para poder criar um usuário.
  async create(createUserDto: CreateUserDto) {
    const {email, password} = createUserDto;
    //Se o e-mail já estiver em uso, a aplicação não pode criar a conta (409 Conflict). 
    //A senha precisa ser segura, ou seja, pelo menos 10 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e um 1 caractere especial (400 Bad Request).
    const user = await this.repository.findByEmail(email);
    if (user) throw new HttpException("E-mail already exists", HttpStatus.CONFLICT);
    if (!this.isPasswordSecure(password)) {
      throw new HttpException(
        'A senha não atende aos critérios de segurança',
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.repository.create(createUserDto);
  }

  //verificando se a senha é segura
  private isPasswordSecure(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
  }

  //O usuário deverá utilizar o e-mail e senha cadastrados. 
  //Caso ele forneça dados incompatíveis, a aplicação deverá avisá-lo (401 Unauthorized). 
  //Ao finalizar o login, ele deverá receber um token baseado na estratégia JWT
  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
