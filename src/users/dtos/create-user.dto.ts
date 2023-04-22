import { IsEmail, IsNotEmpty, MinLength, ValidationArguments } from 'class-validator' ;
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
