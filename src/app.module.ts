import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { TaskModule } from './task/task.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(dataSourceOptions),
  UsersModule,
  AuthModule,
  TaskModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
