import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Subtask } from '../entities/subtasks.entity';

@Injectable()
export class SubtasksRepository extends Repository<Subtask> {
  constructor(private readonly dataSource: DataSource) {
    super(Subtask, dataSource.createEntityManager());
  }

  async findAll(): Promise<Subtask[]> {
    return this.find();
  }

  // async findOneById(id: number): Promise<Subtask | null> {
  //   return this.findOne({ where: { id } });
  // }

  async createsubTask(subtaskData: Partial<Subtask>): Promise<Subtask> {
    const newSubTask = this.create(subtaskData);
    return this.save(newSubTask);
  }

  // async updateSubtask(
  //   id: number,
  //   subtaskData: Partial<Subtask>,
  // ): Promise<Subtask | null> {
  //   const subtask = await this.findOneById(id);
  //   if (!subtask) return null;
  //   this.merge(subtask, subtaskData);
  //   return this.save(subtask);
  // }
}
