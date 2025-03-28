import { Injectable, NotFoundException } from '@nestjs/common';
import { SubtasksRepository } from '../repositories/subtasks.repository';
import { CreateSubtaskDto } from '../dto/create-subtask.dto';
import { Subtask } from '../entities/subtasks.entity';
import { TasksRepository } from 'src/tasks/repositories/tasks.repository';

@Injectable()
export class SubtasksService {
  constructor(
    private readonly taskRepository: TasksRepository,
    private readonly subtaskRepository: SubtasksRepository,
  ) {}
  async findAll(): Promise<Subtask[]> {
    return this.subtaskRepository.findAll();
  }

  // space for findOne

  async create(body: CreateSubtaskDto): Promise<Subtask> {
    const task = await this.taskRepository.findOneById(body.taskId);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    return this.subtaskRepository.createsubTask({
      name: body.name,
      completed: body.completed || false,
      task: task,
    });
  }
}
