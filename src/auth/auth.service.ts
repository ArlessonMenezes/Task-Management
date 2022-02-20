import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compareSync } from 'bcrypt';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ){}

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        await this.userRepository.createUser(createUserDto)
    }

    async login(user) {
        const payload = { sub: user.id, email: user.email }  
        
        return {
            token: this.jwtService.sign(payload)
        } 
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User | string> {
        const { email, password } = authCredentialsDto;
        let user: User
       
        user = await this.userRepository.findOne( { email } )
        if (!user) {
            return "E-mail invalid"; 
        }
    
        const isPasswordValid = await compareSync(password, user.password)
        console.log(password)
        if(!isPasswordValid) return 'Password invalid';
        
        return user;
    }
}
