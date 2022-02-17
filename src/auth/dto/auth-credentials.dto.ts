import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty({ message:'Username cannot be empty' })
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty({ message:'Password cannot be empty' })
    @MinLength(8)
    @MaxLength(32)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    // { message: 'password is too weak' })
    password: string;
}