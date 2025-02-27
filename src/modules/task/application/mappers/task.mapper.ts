import { Task } from '@/modules/task/domain/models/task.model';
import { TaskResponseDto } from '@/modules/task/presentation/dtos/task-response-dto';

export class TaskMapper {
  public static toResponseDto(task: Partial<Task>): TaskResponseDto {
    return {
      taskId: task._id!,
      status: task.status!,
      price: task.price!,
      images: task.images?.map((image) => ({
        resolution: image.resolution,
        path: image.path,
      })) || [],
    };
  }
}
