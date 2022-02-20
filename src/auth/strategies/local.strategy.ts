import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from "../model/user.entity";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService : AuthService){
        super({usernameField: 'email'})
    }

    async validate(authCredentialsDto: AuthCredentialsDto,): Promise<User | string> {
        const user = await this.authService.signIn(authCredentialsDto)
        
        if(!user) 
            throw new UnauthorizedException('Please check your login credentials')
        
        return user
    }
}