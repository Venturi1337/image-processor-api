import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskFactory {
  create(originalPath: string): Task {
    const price = Math.floor(Math.random() * (50 - 5 + 1)) + 5;

    return {
      _id: uuidv4(),
      status: TaskStatus.PENDING,
      price,
      originalPath,
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
