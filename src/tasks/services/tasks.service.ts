/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/task.entity';
import { CreateTaskDto } from './../dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    try {
      return this.tasksRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las tareas');
    }
  }

  findOne(id: number): Promise<Task | null> {
    try {
      return this.tasksRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Tarea no encontrada');
    }
  }

  async create(body: CreateTaskDto): Promise<Task> {
    try {
      const newTask = this.tasksRepository.create(body);
      return await this.tasksRepository.save(newTask);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la tarea');
    }
  }

  async update(id: number, body: Partial<CreateTaskDto>): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new NotFoundException('Tarea no encontrada');
      }
      this.tasksRepository.merge(task, body);
      return this.tasksRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la tarea');
    }
  }

  async remove(id: number): Promise<{ Notification: string }> {
    try {
      const task = await this.tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new NotFoundException('Tarea no encontrada');
      }
      await this.tasksRepository.delete(id);
      return { Notification: 'La tarea se eliminó exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar la tarea');
    }
  }
}

// Investigar como Controlar los errores, TryCatch
// Cambiar any por las clases definidas
