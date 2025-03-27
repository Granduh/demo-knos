import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
      {
        provide: getRepositoryToken(Task),
        useClass: Repository,
      },
    ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // getAll method returns all tasks from the service
  it('should return all tasks from the service', async () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
    ];

    const tasksService = {
      findAll: jest.fn().mockResolvedValue(mockTasks),
    };

    const controller = new TasksController(tasksService as any);

    const result = await controller.getAll();

    expect(tasksService.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });

  it('should return all tasks from the service', async () => {
    const mockTasks = [
      { id: 1, name: 'Task 1', completed: false },
      { id: 2, name: 'Task 2', completed: true },
    ];

    const tasksService = {
      findAll: jest.fn().mockResolvedValue(mockTasks),
    };

    const controller = new TasksController(tasksService as any);

    const result = await controller.getAll();

    expect(tasksService.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockTasks);
  });

  // getOne method throws HttpException when task is not found
  it('should throw HttpException when task is not found', async () => {
    const tasksService = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const controller = new TasksController(tasksService as any);

    try {
      await controller.getOne(999);
      fail('Expected HttpException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect(error.getResponse()).toBe('Tarea no encontrada');
    }

    expect(tasksService.findOne).toHaveBeenCalledWith(999);
  });

  it('should return a specific task when it exists', async () => {
    const mockTask = { id: 1, name: 'Task 1', completed: false };

    const tasksService = {
      findOne: jest.fn().mockResolvedValue(mockTask),
    };

    const controller = new TasksController(tasksService as any);

    const result = await controller.getOne(1);

    expect(tasksService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockTask);
  });
});
