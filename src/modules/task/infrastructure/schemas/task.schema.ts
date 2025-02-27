import { v4 as uuidv4 } from 'uuid';
import { HydratedDocument, model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task, TaskStatus } from '@/modules/task/domain/models/task.model';

export type TaskDocument = HydratedDocument<TaskEntity>;

@Schema({ timestamps: true, collection: 'tasks' })
export class TaskEntity implements Task { 
  @Prop({ required: true, default: uuidv4() })
  _id: string;

  @Prop({ required: true, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  originalPath: string;

  @Prop({ type: [{ resolution: String, path: String }] })
  images?: { resolution: string; path: string }[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
export const TaskModel = model<TaskEntity>('Task', TaskSchema);
