/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './../entities/task.entity';
import { Repository } from 'typeorm';
import { TasksRepository } from '../repositories/tasks.repository';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: TasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task), // Registro del repositorio
          useClass: Repository, // Usamos la clase Repository de TypeORM como mock
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<TasksRepository>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
