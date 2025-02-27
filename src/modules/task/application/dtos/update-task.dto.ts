import { ITaskImage, TaskStatus } from '@/modules/task/domain/models/task.model';

export class UpdateTaskDto {
  _id?: string;
  status?: TaskStatus;
  price?: number;
  originalPath?: string;
  createdAt?: Date;
  updatedAt?: Date;
  images?: ITaskImage[];
}
