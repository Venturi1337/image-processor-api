export class GetTaskDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  assignedTo?: string;

  constructor(data: Partial<GetTaskDTO>) {
    Object.assign(this, data);
  }
}
