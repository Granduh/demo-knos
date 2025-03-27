import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from '../repositories/tasks.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async create(body: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(body);
  }

  async update(id: number, body: Partial<CreateTaskDto>): Promise<Task> {
    const updatedTask = await this.tasksRepository.updateTask(id, body);
    if (!updatedTask) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return updatedTask;
  }

  async remove(id: number): Promise<{ Notification: string }> {
    const deleted = await this.tasksRepository.deleteTask(id);
    if (!deleted) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return { Notification: 'La tarea se eliminó exitosamente' };
  }
}
