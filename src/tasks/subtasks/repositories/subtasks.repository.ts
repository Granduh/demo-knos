import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Subtask } from '../entities/subtasks.entity';

@Injectable()
export class SubtasksRepository extends Repository<Subtask> {
  constructor(private readonly dataSource: DataSource) {
    super(Subtask, dataSource.createEntityManager());
  }
}
