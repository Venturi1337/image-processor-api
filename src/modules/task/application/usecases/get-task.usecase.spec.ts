import { GetTaskUseCase } from '@/modules/task/application/usecases/get-task.usecase';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { ApiResponse } from '@/modules/shared/domain/response/api.response';
import { Task, TaskStatus } from '@/modules/task/domain/models/task.model';
import { TaskNotFoundException } from '../../domain/exceptions/task-not-found.exception';
import { CreateTaskException } from '../../domain/exceptions/create-task.exception';

describe('GetTaskUseCase', () => {
  let useCase: GetTaskUseCase;
  let taskRepository: jest.Mocked<TaskRepositoryPort>;

  const taskId = '123e4567-e89b-12d3-a456-426614174000';

  beforeEach(() => {
    taskRepository = {
      findById: jest.fn(),
    } as any;

    useCase = new GetTaskUseCase(taskRepository);
  });

  it('should return task when found', async () => {
    const mockTask = {
      _id: taskId,
      price: 100,
      status: TaskStatus.PENDING,
      originalPath: 'originalPath',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;
    taskRepository.findById.mockResolvedValue(mockTask);

    const result = await useCase.execute(taskId);

    expect(result).toEqual(ApiResponse.success(mockTask));
    expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
  });

  it('should throw TaskNotFoundException when task is not found', async () => {
    taskRepository.findById.mockResolvedValue(null);

    const invalidTaskId = `${taskId} - invalid`;

    await expect(useCase.execute(invalidTaskId)).rejects.toThrow(
      new TaskNotFoundException(invalidTaskId),
    );
    expect(taskRepository.findById).toHaveBeenCalledWith(invalidTaskId);
  });

  it('should throw unexpected errors', async () => {
    const error = new CreateTaskException('Database error');
    taskRepository.findById.mockRejectedValue(error);

    await expect(useCase.execute(taskId)).rejects.toThrow(error);
    expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
  });
});
