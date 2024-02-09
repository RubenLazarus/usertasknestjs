import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/utils/entities';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[TypeOrmModule.forFeature(entities),ScheduleModule.forRoot()],
  controllers: [TaskController],
  providers: [{
    provide:Services.TASK,
    useClass:TaskService
  }]
})
export class TaskModule {}
