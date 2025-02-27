import { Task } from '@/modules/task/domain/models/task.model';

export interface TaskRepositoryPort {
  create(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
  delete(taskId: string): Promise<void>;
}
