import { Injectable, Search } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { Status } from 'src/utils/constants';
import { filterData } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>,
    ) { }

    async createTask(taskData: any) {
        try {
            const task: TaskEntity = new TaskEntity();
            task.title = taskData.title;
            task.assignedUser = taskData.assignedUser;
            task.descreption = taskData.descreption;
            task.prioriyt = taskData.prioriyt;
            task.projectName = taskData.projectName;
            task.createdAt = new Date();
            task.status = Status.PENDING;
            let savedTask = await this.taskRepository.save(task);
            if (!savedTask) {
                return {
                    success: false,
                    message: "Unable to Create Task"
                }
            }

            return {
                success: true,
                message: "Task has been created",
                task: savedTask
            }
        } catch (e) {
            console.log(e)
        }

    }
    async getAllTask(filterData: filterData) {
        try {
            let pageNumber = 1
            let pageSize = 0
            let search = [{ isActive: true }, { isDeleted: false }]
            if (filterData?.pageNumber) {
                pageNumber = filterData.pageNumber;
            }
            if (filterData?.pageSize) {
                pageSize = filterData.pageSize;
            }
            const taskCount = await this.taskRepository
                .count({ where: search })
            var numberOfPages = pageSize === 0 ? 1 : Math.ceil(taskCount / pageSize);

            const allTask = this.taskRepository.find({
                where: search,
                order: {
                    createdAt: 'DESC'
                },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize

            })
            return {
                success: true,
                message: "List all Task",
                tasks: allTask,
                numberOfPages
            }
        } catch (e) {
            console.log(e)
        }
    }
}
