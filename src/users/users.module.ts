import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/utils/entities';
import { Services } from 'src/utils/constants';

@Module({
  imports:[TypeOrmModule.forFeature(entities)],
  controllers: [UsersController],
  providers: [{
    provide:Services.USERS,
    useClass:UsersService
  }]
})
export class UsersModule {}
