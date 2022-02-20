import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.authService.signUp(createUserDto)
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User | string> {
        return await this.authService.signIn(authCredentialsDto)
    }
}
