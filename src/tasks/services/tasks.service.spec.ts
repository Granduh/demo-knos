import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../repositories/tasks.repository';

describe('TasksService', () => {
  let service: TasksService;
  let repository: TasksRepository;

  const mockTasksRepository = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: TasksRepository,
        useValue: mockTasksRepository,
      }
    ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
