import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from '../repositories/tasks.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tasksRepository: TasksRepository,
  ) {}
  // Operaciones de lectura no necesitan transacciones
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
  // Operaciones de escritura necesitan transacciones
  async create(body: CreateTaskDto): Promise<Task> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const task = await this.tasksRepository.createTask(queryRunner, body);
      await queryRunner.commitTransaction();
      return task;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al crear la tarea');
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, body: Partial<CreateTaskDto>): Promise<Task> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updatedTask = await this.tasksRepository.updateTask(
        queryRunner,
        id,
        body,
      );
      await queryRunner.commitTransaction();
      return updatedTask;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al actualizar la tarea');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<{ Notification: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const deleted = await this.tasksRepository.deleteTask(queryRunner, id);
      if (!deleted) {
        throw new NotFoundException('Tarea no encontrada');
      }
      await queryRunner.commitTransaction();
      return { Notification: 'La tarea se eliminó existosamente.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al eliminar la tarea');
    } finally {
      await queryRunner.release();
    }
  }
}
