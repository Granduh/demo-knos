import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Public, Roles } from 'nest-keycloak-connect';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles('admin')
  getAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  async getOne(@Param('id') id: number): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Post()
  @Public()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(body);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(
    @Param('id') id: number,
    @Body() body: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: number): Promise<{ Notification: string }> {
    if (!Delete) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }
    return this.tasksService.remove(id);
  }
}
