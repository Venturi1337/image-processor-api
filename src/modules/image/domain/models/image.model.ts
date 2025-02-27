export interface IImage {
  _id?: string;
  taskId: string;
  resolution: number;
  path: string;
  createdAt?: Date;
}

export class Image implements IImage {
  public readonly _id?: string;
  public readonly taskId: string;
  public readonly path: string;
  public readonly resolution: number;
  public readonly createdAt?: Date;

  constructor(params: {
    _id?: string;
    taskId?: string;
    path: string;
    resolution: number;
    createdAt?: Date;
  }) {
    this._id = params._id;
    this.taskId = params.taskId || '';
    this.path = params.path;
    this.resolution = params.resolution;
    this.createdAt = params.createdAt;
  }
}
