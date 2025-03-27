import {
  // eslint-disable-next-line prettier/prettier
  Body,  Controller,  Delete,  Get,  Param,  Post,  Put, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ Notification: string }> {
    if (!Delete) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return this.tasksService.remove(id);
  }
}
