import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findAll(): Promise<Task[]> {
    return this.find();
  }

  async findOneById(id: number): Promise<Task | null> {
    return this.findOne({ where: { id } });
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const newTask = this.create(taskData);
    return this.save(newTask);
  }

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
    const task = await this.findOneById(id);
    if (!task) return null;
    this.merge(task, taskData);
    return this.save(task);
  }

  async deleteTask(id: number): Promise<string> {
    const result = await this.delete(id);

    if ((result.affected ?? 0) > 0) {
      return 'La tarea se eliminó exitosamente';
    } else {
      throw new NotFoundException('Tarea no encontrada');
    }
  }
}
