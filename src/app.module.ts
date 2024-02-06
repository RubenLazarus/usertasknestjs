import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    password: 'u@123',
    username: 'postgres',
    entities:   [__dirname + '/**/*.entity{.ts,.js}'],
    migrations:[],
    database: 'task',
    synchronize: false,
    logging: false,
  }),
  UsersModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
