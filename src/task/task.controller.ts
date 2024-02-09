import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { ITaskService } from './task';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { filterData } from 'src/utils/types';

@Controller(Routes.TASK)
export class TaskController {
    constructor(
        @Inject(Services.TASK) private taskService: ITaskService
      ) {}  
      @Post('')
      async createTask(@Body() createTaskDTO:CreateTaskDto){
        return await this.taskService.createTask(createTaskDTO)
      }
      @Get('')
      async getAllTask(@Query() filterData :filterData){
        return await this.taskService.getAllTask(filterData)
      }
}
