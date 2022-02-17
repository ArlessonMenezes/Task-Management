import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'taskManagement',
      entities: [__dirname + "dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
