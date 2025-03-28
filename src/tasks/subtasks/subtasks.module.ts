import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtasksRepository } from './repositories/subtasks.repository';
import { TasksModule } from '../tasks.module';
import { SubtasksController } from './controllers/subtasks.controller';
import { SubtasksService } from './services/subtasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubtasksRepository]),forwardRef(()=> TasksModule)],
  providers: [SubtasksService, SubtasksRepository],
  controllers: [SubtasksController],
})
export class SubtasksModule {}
