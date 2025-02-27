import { ITaskImage, TaskStatus } from '@/modules/task/domain/models/task.model';

export class TaskEventDto {
  constructor(
    public taskId?: string,
    public status?: TaskStatus,
    public images?: ITaskImage[],
    public originalPath?: string,
    public error?: string,
  ) {}
}
