export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface ITaskImage {
  resolution: string;
  path: string;
}

export interface ITask {
  _id: string;
  status: TaskStatus;
  price: number;
  originalPath: string;
  createdAt: Date;
  updatedAt: Date;
  images?: ITaskImage[];
}

export class Task implements ITask {
  constructor(
    public _id: string,
    public status: TaskStatus,
    public price: number,
    public originalPath: string,
    public createdAt: Date,
    public updatedAt: Date,
    public images?: ITaskImage[],
  ) {}
}
