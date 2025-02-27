import { Task } from '@/modules/task/domain/models/task.model';

export interface TaskRepositoryPort {
  create(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  update(id: string, task: Partial<Task>): Promise<Task | null>;
  delete(taskId: string): Promise<boolean>;
}