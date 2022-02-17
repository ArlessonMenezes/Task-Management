import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repository/users.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      privateKey: 'dccd96c256bc7dd39bae41a405f25e43',
      signOptions: { expiresIn: '60' }
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
