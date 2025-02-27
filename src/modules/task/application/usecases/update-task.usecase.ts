import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';
import { UpdateTaskException } from '@/modules/task/domain/exceptions/update-task.exception';
import { UpdateTaskDto } from '@/modules/task/application/dtos/update-task.dto';
import { TaskResponseDto } from '../../presentation/dtos/task-response-dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(_id: string, data: UpdateTaskDto): Promise<any> {
    try {
      const taskImages =
        data.images?.map((image) => ({
          resolution: image.resolution.toString(),
          path: image.path,
        })) || [];

      const updatedTask = await this.taskRepository.update(_id, {
        ...data,
        images: taskImages,
      });
      return updatedTask;
    } catch (error) {
      throw new UpdateTaskException(error.message);
    }
  }
}
