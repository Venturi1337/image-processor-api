import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { TaskController } from '@/modules/task/presentation/controllers/task.controller';
import { TaskService } from '@/modules/task/application/services/task.service';
import { TaskResponseDto } from '@/modules/task/presentation/dtos/task-response-dto';
import { TaskStatus } from '@/modules/task/domain/models/task.model';
import { CreateTaskDto } from '@/modules/task/presentation/dtos/create-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: TaskService;

  const mockTaskService = {
    createTask: jest.fn(),
    getTask: jest.fn(),
  };

  const mockTaskResponse: TaskResponseDto = {
    taskId: '123e4567-e89b-12d3-a456-426614174000',
    status: TaskStatus.PENDING,
    price: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const createTaskDto: CreateTaskDto = {
        originalPath: '/path/to/file',
      };

      mockTaskService.createTask.mockResolvedValue(mockTaskResponse);

      const result = await controller.createTask(createTaskDto);

      expect(result).toBe(mockTaskResponse);
      expect(taskService.createTask).toHaveBeenCalledWith(createTaskDto.originalPath);
      expect(taskService.createTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTask', () => {
    it('should get a task by ID successfully', async () => {
      const taskId = '123e4567-e89b-12d3-a456-426614174000';

      mockTaskService.getTask.mockResolvedValue(mockTaskResponse);

      const result = await controller.getTask(taskId);

      expect(result).toBe(mockTaskResponse);
      expect(taskService.getTask).toHaveBeenCalledWith(taskId);
      expect(taskService.getTask).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when task is not found', async () => {
      const taskId = 'non-existent-id';

      mockTaskService.getTask.mockRejectedValue(new NotFoundException('Task not found'));

      await expect(controller.getTask(taskId)).rejects.toThrow(NotFoundException);
      expect(taskService.getTask).toHaveBeenCalledWith(taskId);
      expect(taskService.getTask).toHaveBeenCalledTimes(1);
    });
  });
});