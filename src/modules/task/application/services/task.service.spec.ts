import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskService } from './task.service';
import { TaskController } from '@/modules/task/presentation/controllers/task.controller';
import { TaskMongoRepository } from '@/modules/task/infrastructure/adapters/mongo/mongo-task.repository';
import { CreateTaskUseCase } from '@/modules/task/application/usecases/create-task.usecase';
import { UpdateTaskUseCase } from '@/modules/task/application/usecases/update-task.usecase';
import { GetTaskUseCase } from '@/modules/task/application/usecases/get-task.usecase';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: CreateTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: TaskMongoRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
