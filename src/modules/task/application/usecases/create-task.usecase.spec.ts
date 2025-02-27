import { Test } from '@nestjs/testing';
import { CreateTaskUseCase } from '@/modules/task/application/usecases/create-task.usecase';
import { TaskFactory } from '@/modules/task/domain/task.factory';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { CreateTaskException } from '@/modules/task/domain/exceptions/create-task.exception';
import { Task, TaskStatus } from '@/modules/task/domain/models/task.model';
import { ApiResponse } from '@/modules/shared/domain/response/api.response';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ModuleRef } from '@nestjs/core';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskFactory: TaskFactory;
  let taskRepository: TaskRepositoryPort;
  let moduleRef;

  const taskId = '123e4567-e89b-12d3-a456-426614174000';

  const originalPath = 'originalPath';

  const mockTask = {
    _id: taskId,
    price: 100,
    status: TaskStatus.PENDING,
    originalPath,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Task;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskFactory,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: 'TaskRepository',
          useValue: {
            create: jest.fn(),
          },
        },
        EventEmitter2,
      ],
    }).compile();

    createTaskUseCase = moduleRef.get(CreateTaskUseCase);
    taskFactory = moduleRef.get(TaskFactory);
    taskRepository = moduleRef.get('TaskRepository');
  });

  it('should create a task successfully', async () => {
    jest.spyOn(taskFactory, 'create').mockReturnValue(mockTask);
    jest.spyOn(taskRepository, 'create').mockResolvedValue(mockTask);

    const result = await createTaskUseCase.execute({
      originalPath,
    });

    expect(taskFactory.create).toHaveBeenCalledWith(originalPath);
    expect(taskRepository.create).toHaveBeenCalledWith(mockTask);
    expect(result).toEqual(ApiResponse.success(mockTask));
  });

  it('should throw CreateTaskException when task creation fails', async () => {
    const error = new Error('Invalid task data');
    jest.spyOn(taskFactory, 'create').mockImplementation(() => {
      throw error;
    });

    await expect(createTaskUseCase.execute({ originalPath })).rejects.toThrow(
      CreateTaskException,
    );
  });

  it('should emit TASK_CREATED event on successful creation', async () => {
    jest.spyOn(taskFactory, 'create').mockReturnValue(mockTask);
    jest.spyOn(taskRepository, 'create').mockResolvedValue(mockTask);
    const eventEmitter = moduleRef.get(EventEmitter2);
    const eventEmitterSpy = jest.spyOn(eventEmitter, 'emit');

    await createTaskUseCase.execute({ originalPath });

    expect(eventEmitterSpy).toHaveBeenCalledWith('task.created', {
      taskId: mockTask._id,
      status: TaskStatus.PENDING,
      originalPath,
    });
  });
});
