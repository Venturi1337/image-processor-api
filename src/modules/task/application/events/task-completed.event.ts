import { TaskStatus } from '@/modules/task/domain/models/task.model';

export class TaskCompletedEvent {
  constructor(
    public taskId: string,
    public status: TaskStatus,
    public images: { resolution: number; path: string }[],
  ) {}
}
