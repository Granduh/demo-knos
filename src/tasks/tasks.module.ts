import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
