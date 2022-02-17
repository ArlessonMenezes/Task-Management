import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './model/task-entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
      private readonly taskService: TasksService,
      private readonly taskRepository: TasksService,
    ) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto)
  }

  @Put(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto
    return this.taskService.updateTask(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
