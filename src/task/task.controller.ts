import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { ITaskService } from './task';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { filterData } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { GetId } from 'src/auth/decorator/getIdDecorator';

@Controller(Routes.TASK)
@UseGuards(JwtAuthGuard)
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
      @Get('getAllByUserTask')
      async getAllByUserTask(@Query() filterData :filterData,@GetId() userId:string){
        return await this.taskService.getAllByUserTask(filterData,userId)
      }
      @Get('getTaskById')
      async getTaskById(@Query() id:any){
        return await this.taskService.getTaskById(id)
      }
      @Put('updateTask')
      async updateTask(@Body() taskData:any){
        return await this.taskService.updateTask(taskData)
      }
      @Put('softDeleteTask')
      async softDeleteTask(@Body() taskData:any){
        return await this.taskService.deleteTask(taskData?.id)
      }
      @Delete('hardDeleteTask')
      async hardDeleteTask(@Body() taskData:any){
        return await this.taskService.hardDeleteTask(taskData?.id)
      }
      @Put('activeInaciveTask')
      async activeInaciveTask(@Body() taskData:any){
        return await this.taskService.activeInaciveTask(taskData?.id)
      }
}
