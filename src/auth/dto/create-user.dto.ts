import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {   
    @IsString()
    @IsNotEmpty({ message:'Username cannot be empty' })
    @MinLength(4)
    @MaxLength(32)
    username: string;
}