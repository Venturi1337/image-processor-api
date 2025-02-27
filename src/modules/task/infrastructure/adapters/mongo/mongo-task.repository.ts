import { Injectable } from '@nestjs/common';
import {
  TaskEntity,
  TaskModel,
} from '@/modules/task/infrastructure/schemas/task.schema';
import { MongoRepository } from '@/modules/shared/infrastructure/persistence/mongo/base-mongo.repository';
import { Task } from '@/modules/task/domain/models/task.model';
import { TaskRepositoryPort } from '@/modules/task/domain/repositories/task.repository';

@Injectable()
export class TaskMongoRepository
  extends MongoRepository<TaskEntity>
  implements TaskRepositoryPort
{
  constructor() {
    super(TaskModel);
  }

  async create(task: Task): Promise<Task> {
    return await super.create(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await super.findById(id);
    return task
      ? new Task(
          task._id,
          task.status,
          task.price,
          task.originalPath,
          task.createdAt,
          task.updatedAt,
          task.images,
        )
      : null;
  }

  async update(id: string, task: Partial<Task>): Promise<Task | null> {
    return await super.update(id, task);
  }

  async delete(taskId: string): Promise<boolean> {
    return await super.delete(taskId);
  }
}
