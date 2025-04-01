import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Subtask } from '../entities/subtasks.entity';

@Injectable()
export class SubtasksRepository extends Repository<Subtask> {
  constructor(private readonly dataSource: DataSource) {
    super(Subtask, dataSource.createEntityManager());
  }

  async findByTaskId(taskId: number): Promise<Subtask[]> {
    return this.find({ where: { task: { id: taskId } } });
  }
}
