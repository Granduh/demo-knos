import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtasksRepository } from './repositories/subtasks.repository';
import { TasksModule } from '../tasks.module';
import { SubtasksController } from './controllers/subtasks.controller';
import { SubtasksService } from './services/subtasks.service';
import { Task } from '../entities/task.entity';
import { Subtask } from './entities/subtasks.entity';
import { TasksRepository } from '../repositories/tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subtask, Task]),
    forwardRef(() => TasksModule),
  ],
  providers: [SubtasksService, SubtasksRepository, TasksRepository],
  controllers: [SubtasksController],
})
export class SubtasksModule {}
