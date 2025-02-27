import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { TaskNotFoundException } from '@/modules/task/domain/exceptions/task-not-found.exception';
import { ApiResponse } from '@/modules/shared/domain/response/api.response';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(taskId: string): Promise<ApiResponse> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new TaskNotFoundException(taskId);
    }

    return ApiResponse.success(task);
  }
}
