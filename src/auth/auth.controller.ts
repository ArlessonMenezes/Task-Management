import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './model/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    async createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.authService.singUp(authCredentialsDto)
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('/signin')
    async signIn(@Body() username: AuthCredentialsDto, password: AuthCredentialsDto): Promise<User> {
        return await this.authService.signIn(username, password)
    }
}
