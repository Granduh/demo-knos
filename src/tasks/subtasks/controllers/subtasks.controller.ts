import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubtasksService } from '../services/subtasks.service';
import { Subtask } from '../entities/subtasks.entity';
import { CreateSubtaskDto } from '../dto/create-subtask.dto';

@Controller('api/tasks/subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get()
  getAll(): Promise<Subtask[]> {
    return this.subtasksService.findAll();
  }

  // space for getOne

  @Post()
  create(@Body() body: CreateSubtaskDto): Promise<Subtask> {
    return this.subtasksService.create(body);
  }
}
