import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';

@Controller('api/tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name); //Debugging
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    this.logger.debug(`Received body: ${JSON.stringify(body)}`);
    if (!body) {
      this.logger.error('Request body is undefined');
      throw new BadRequestException('Request body is undefined');
    }
    if (!body.name) {
      this.logger.error('Task name is missing');
      throw new BadRequestException('Task name is missing');
    }
    return this.tasksService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
