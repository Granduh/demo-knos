import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';
import { SubtasksModule } from './subtasks/subtasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => SubtasksModule)],
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
