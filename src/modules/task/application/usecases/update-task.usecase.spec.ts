import { Test } from '@nestjs/testing';
import { UpdateTaskUseCase } from '@/modules/task/application/usecases/update-task.usecase';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { UpdateTaskException } from '@/modules/task/domain/exceptions/update-task.exception';
import { UpdateTaskDto } from '@/modules/task/application/dtos/update-task.dto';
import { TaskStatus } from '@/modules/task/domain/models/task.model';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let taskRepository: TaskRepositoryPort;

  const mockTaskRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        {
          provide: 'TaskRepository',
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    useCase = moduleRef.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    taskRepository = moduleRef.get<TaskRepositoryPort>('TaskRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const mockTaskId = 'task-123';
    const mockUpdateDto: UpdateTaskDto = {
      price: 50,
      status: TaskStatus.COMPLETED,
      images: [
        { resolution: '800', path: '/path/to/image1' },
        { resolution: '1024', path: '/path/to/image2' },
      ],
    };

    const mockUpdatedTask = {
      _id: mockTaskId,
      ...mockUpdateDto,
    };

    it('should successfully update a task', async () => {
      mockTaskRepository.update.mockResolvedValue(mockUpdatedTask);

      const result = await useCase.execute(mockTaskId, mockUpdateDto);

      expect(taskRepository.update).toHaveBeenCalledWith(mockTaskId, {
        ...mockUpdateDto,
        images: mockUpdateDto.images,
      });

      expect(result).toEqual(mockUpdatedTask);
    });
    it('should handle UpdateTaskException', async () => {
      const errorMessage = 'Task not found';
      mockTaskRepository.update.mockRejectedValue(
        new UpdateTaskException(errorMessage),
      );

      await expect(useCase.execute(mockTaskId, mockUpdateDto)).rejects.toThrow(
        UpdateTaskException,
      );
    });

    it('should handle unexpected errors', async () => {
      mockTaskRepository.update.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(useCase.execute(mockTaskId, mockUpdateDto)).rejects.toThrow(
        UpdateTaskException,
      );
    });
  });
});
