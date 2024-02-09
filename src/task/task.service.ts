import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { Status } from 'src/utils/constants';
import { filterData } from 'src/utils/types';
import { Not, Repository } from 'typeorm';

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
            task.updatedAt = new Date();
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
            let object = Object.assign({}, ...search)
            const taskCount = await this.taskRepository
                .count({ where: object })
            var numberOfPages = pageSize === 0 ? 1 : Math.ceil(taskCount / pageSize);

            const allTask = await this.taskRepository.find({
                relations: ['assignedUser'],
                where: object,
                order: {
                    createdAt: 'DESC'
                },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize ? pageSize : Number.MAX_SAFE_INTEGER

            })
            return {
                success: true,
                message: "List all Task",
                tasks: allTask ? allTask : [],
                numberOfPages
            }
        } catch (e) {
            console.log(e)
        }
    }
    async getAllByUserTask(filterData: filterData, userId) {
        try {
            let pageNumber = 1
            let pageSize = 0
            let search: any = [{ isActive: true }, { isDeleted: false }]
            if (filterData?.pageNumber) {
                pageNumber = filterData.pageNumber;
            }
            if (filterData?.pageSize) {
                pageSize = filterData.pageSize;
            }
            if (userId) {
                search.push({ assignedUser: { id: userId } })
            }
            let object = Object.assign({}, ...search);
            const taskCount = await this.taskRepository
                .count({ relations: ['assignedUser'], where: object })
            var numberOfPages = pageSize === 0 ? 1 : Math.ceil(taskCount / pageSize);

            const allTask = await this.taskRepository.find({
                relations: ['assignedUser'],
                where: object,
                order: {
                    createdAt: 'DESC'
                },
                skip: (pageNumber - 1) * pageSize,
                take: pageSize ? pageSize : Number.MAX_SAFE_INTEGER

            })
            return {
                success: true,
                message: "List all Task",
                tasks: allTask ? allTask : [],
                numberOfPages
            }
        } catch (e) {
            console.log(e)
        }
    }
    async getTaskById(taskId: any) {
        try {

            let task = await this.taskRepository.findOne({ where: taskId })
            if (!task) {
                return {
                    success: false,
                    message: "Task not found"
                }
            }
            return {
                success: true,
                message: "Task Found successfully",
                taskDetails: task
            }
        } catch (e) {
            console.log(e)
        }
    }
    async updateTask(taskData: any) {
        try {
            if (!taskData?.id) {
                return {
                    success: false,
                    message: "Id not found please send id in body"
                }
            }
            let getTask = await this.taskRepository.findOneBy({ id: taskData?.id })
            if (taskData?.title) {
                getTask.title = taskData?.title
            }
            if (taskData?.projectName) {
                getTask.projectName = taskData?.projectName
            }
            if (taskData?.assignedUser) {
                getTask.assignedUser = taskData?.assignedUser
            }
            if (taskData?.prioriyt) {
                getTask.prioriyt = taskData?.prioriyt
            }
            if (taskData?.descreption) {
                getTask.descreption = taskData?.descreption
            }
            if (taskData?.status) {
                getTask.status = taskData?.status
            }
            let updataTask = await this.taskRepository.save(getTask)
            if (!updataTask) {
                return {
                    success: false,
                    message: "Unable to update"
                }
            }

            return {
                success: true,
                message: "Updated successfully",
                taskDetails: updataTask
            }
        } catch (e) {
            console.log(e)
        }
    }
    async deleteTask(taskId) {
        if (!taskId) {
            return {
                success: false,
                message: "Please provid id"
            }
        }

        let getTask = await this.taskRepository.findOneBy({ id: taskId });
        if (!getTask) {
            return {
                success: false,
                message: "Task not found"
            }
        }
        getTask.isDeleted = !getTask.isDeleted
        let deleted = await this.taskRepository.save(getTask)
        if (!deleted) {
            return {
                success: false,
                message: "Unable to Delete Task"
            }
        }
        return {
            success: true,
            message: "Task has been deleted successfully"
        }

    }
    async activeInaciveTask(taskId) {
        if (!taskId) {
            return {
                success: false,
                message: "Please provid id"
            }
        }

        let getTask = await this.taskRepository.findOneBy({ id: taskId });
        if (!getTask) {
            return {
                success: false,
                message: "Task not found"
            }
        }
        getTask.isActive = !getTask?.isActive
        let deleted = await this.taskRepository.save(getTask)
        if (!deleted) {
            return {
                success: false,
                message: "Unable to change Active status"
            }
        }
        return {
            success: true,
            message: "Task has been updated successfully"
        }

    }
    async hardDeleteTask(taskId) {
        if (!taskId) {
            return {
                success: false,
                message: "Please provid id"
            }
        }

        let getTask = await this.taskRepository.findOneBy({ id: taskId });
        if (!getTask) {
            return {
                success: false,
                message: "Task not found"
            }
        }
        let deleted = await this.taskRepository.delete({ id: getTask?.id })
        if (!deleted) {
            return {
                success: false,
                message: "Unable to Delete Task"
            }
        }
        return {
            success: true,
            message: "Task has been Hard Deleted successfully"
        }

    }
    @Cron('*/10 * * * *')
    async hendlearTaskCron() {
        try {
            let getalltask = await this.taskRepository.find({ where: { status: Not(Status.RESOLVED) } })
            if (getalltask && getalltask.length > 0) {
                for await (const iterator of getalltask) {
                    let currentData = new Date()
                    let createdAt = new Date(iterator?.createdAt)
                    const taskTime = Math.floor((currentData.getTime() - createdAt.getTime()))
                    const showTime = this.parseMillisecondsIntoReadableTime(taskTime)
                    await this.taskRepository.update({ id: iterator?.id }, { timeTaken: taskTime, showTimeTaken: showTime })

                }
            }

        } catch (e) {
            console.log(e)

        }
    }
    private parseMillisecondsIntoReadableTime(milliseconds) {
        //Get hours from milliseconds
        var hours = milliseconds / (1000 * 60 * 60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


        return h + ':' + m + ':' + s;
    }
}
