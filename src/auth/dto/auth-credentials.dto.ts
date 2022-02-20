import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    @IsNotEmpty({ message:'E-mail cannot be empty' })
    email: string

    @IsString()
    @IsNotEmpty({ message:'Password cannot be empty' })
    @MinLength(8)
    @MaxLength(32)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    // { message: 'password is too weak' })
    password: string;   
}