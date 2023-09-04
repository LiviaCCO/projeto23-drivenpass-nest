import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, {
    message:
      'A senha deve ter pelo menos 10 caracteres, 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial',
  })
  password: string;
}

