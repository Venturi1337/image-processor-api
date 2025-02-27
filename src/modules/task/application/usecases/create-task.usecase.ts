import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskFactory } from '@/modules/task/domain/task.factory';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { CreateTaskException } from '@/modules/task/domain/exceptions/create-task.exception';
import { ApiResponse } from '@/modules/shared/domain/response/api.response';
import { TaskEventTypes } from '@/modules/task/application/events/task.event-types';
import { TaskStatus } from '@/modules/task/domain/models/task.model';
import { CreateTaskDto } from '../../presentation/dtos/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskFactory: TaskFactory,
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute({ originalPath }: CreateTaskDto): Promise<ApiResponse> {
    try {
      const task = this.taskFactory.create(originalPath);

      const createdTask = await this.taskRepository.create(task);
      if (!createdTask) {
        throw new CreateTaskException('Task creation failed');
      }
      this.eventEmitter.emit(TaskEventTypes.TASK_CREATED, {
        taskId: createdTask._id,
        status: TaskStatus.PENDING,
        originalPath,
      });
      return ApiResponse.success(createdTask);
    } catch (error) {
      throw error
    }
  }
}
