import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './repository/task-repository';
import { Task } from './model/task-entity';
import { TaskStatus } from './enum/task-status.enum';

export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly tasksRepository : TaskRepository,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find()
  }

  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks()

  //   if(status) {
  //     tasks = tasks.filter((task) => task.status === status)
  //   }

  //   if(search) {
  //     tasks = tasks.filter((task => {
  //       if(task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       } 
  //       return false;
  //       }
  //     ))
  //   }
  //   return tasks;
  // }

     async getTaskById(id: string): Promise<Task> {
       const task = await this.tasksRepository.findOne(id)

       if(!task) {
         throw new NotFoundException(`Task with Id: ${id} not found`)
       }
       return task;
     }

     async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      const { title, description } = createTaskDto;

      const task = this.tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN
      }) 

      return await this.tasksRepository.save(task);
     }
  // createTasks(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
     async updateTask(id: string, status : TaskStatus): Promise<Task> {
      const task = await this.getTaskById(id)
      
      if(!task) {
        throw new NotFoundException(`Task with Id: ${id} not found`)
      }

      task.status = status;
      
      return await this.tasksRepository.save(task);
     }

    async deleteTask(id: string): Promise<void> {
      const task = await this.getTaskById(id) 
      
      if(!task) {
        throw new NotFoundException(`Task with Id: ${id} not found`)
      }

      this.tasksRepository.remove(task)
     }
}
