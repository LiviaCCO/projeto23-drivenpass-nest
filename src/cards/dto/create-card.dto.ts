import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCardDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    cardNum: number;

    @IsString()
    @IsNotEmpty()
    cardName: string;

    @IsString()
    @IsNotEmpty()
    cardSeg: string;

    //verificar campo de data
    @IsNumber()
    @IsNotEmpty()
    cardDate: number;

    @IsBoolean() 
    @IsNotEmpty()
    isVirtual: boolean;

    @IsString()
    @IsNotEmpty()
    password: string;
}
