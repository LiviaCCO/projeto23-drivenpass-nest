import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import Cryptr from 'cryptr'; 

@Injectable()
export class CredentialsService {

  private readonly cryptr: Cryptr;
  constructor(private readonly repository: CredentialsRepository) { }
 
  async create(createCredentialDto: CreateCredentialDto) {
    const {userId, url, userName, password, title, name, label} = createCredentialDto;
    
    if (!url || !userName || !password) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }
    //pegar o userId
    const existCredential = await this.repository.findByTitleNameLabel(userId, title, name, label);
    if (existCredential) throw new HttpException("Credential already exists", HttpStatus.CONFLICT);
     //para criptografar senha
    const cryptPassword = this.cryptr.encrypt(password);
    const newCredential = await this.repository.create({
      userId,
      url,
      userName,
      password: cryptPassword, 
      title,
      name,
      label,
    });
    return this.repository.create(newCredential);
  }

  async findAll(userId: number) {
    
    const credentials = await this.repository.findAllByUserId(userId);

    // Para descriptografar a senha
    const CredentialsWithDecryptPassword = credentials.map((item: { password: string; }) => ({
      ...item,
      password: this.cryptr.decrypt(item.password),
    }));

    return CredentialsWithDecryptPassword;
  }

  async findOne(userId: number, id: number) {
    const credential = await this.repository.findOneByIdAndUserId(userId, id);

    if (!credential) {
      throw new HttpException('Credencial is not exist', HttpStatus.NOT_FOUND);
    }

    // Descriptografando a senha.
    const CredentialsWithDecryptPassword = {
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    };

    return CredentialsWithDecryptPassword;
  }

  async remove(userId: number, id: number) {
    //procurando a credencial
    const credential = await this.repository.findOneByIdAndUserId(id, userId);
    // se não existir
    if (!credential) {
      throw new HttpException('Credential is not exist', HttpStatus.NOT_FOUND);
    }
    const idCred = credential.id;
    return await this.repository.remove(idCred);
  }
}
