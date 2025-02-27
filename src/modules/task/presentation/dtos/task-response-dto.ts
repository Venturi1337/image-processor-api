import { ITaskImage, TaskStatus } from "@/modules/task/domain/models/task.model";

export class TaskResponseDto {
  taskId!: string;
  status!: TaskStatus;
  price!: number;
  images?: ITaskImage[];
}