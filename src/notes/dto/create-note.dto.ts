import { IsNotEmpty, IsString } from "class-validator/types/decorator/decorators";

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    userId: number;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    note: string;
}
