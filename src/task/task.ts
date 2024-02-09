export interface ITaskService{

    createTask(taskData:any)
    getAllTask(filterData:any)
    getAllByUserTask(filterData:any,userId:string)
    getTaskById(id:any)
    updateTask(taskData:any);
    deleteTask(taskId:string)
    hardDeleteTask(taskId:string)
    activeInaciveTask(taskId:string)
}