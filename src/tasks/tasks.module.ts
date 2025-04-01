import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Subtask } from './entities/subtasks.entity';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';
import { SubtasksRepository } from './repositories/subtasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask])],
  providers: [TasksService, TasksRepository, SubtasksRepository],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
