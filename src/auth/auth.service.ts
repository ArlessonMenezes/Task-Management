import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compareSync } from 'bcrypt';
import { User } from './model/user.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository
    ){}

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(username: AuthCredentialsDto, password: AuthCredentialsDto): Promise<User> {
        let user: User

        try {
            user = await this.userRepository.findOne( { where:{ username } } )
        } catch (err) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password)
        if(!isPasswordValid) return null;
        
        return user;
    }
}
