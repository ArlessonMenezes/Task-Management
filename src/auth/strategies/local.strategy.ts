import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService : AuthService){
        super({usernameField: 'username'})
    }

    async validate(username: AuthCredentialsDto, password: AuthCredentialsDto) {
        const user = await this.authService.signIn(username, password)

        if(!user) throw new UnauthorizedException('Please check your login credentials')
        return user
    }
}