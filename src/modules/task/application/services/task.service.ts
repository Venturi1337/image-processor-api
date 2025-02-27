import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateTaskUseCase } from '@/modules/task/application/usecases/create-task.usecase';
import { UpdateTaskUseCase } from '@/modules/task/application/usecases/update-task.usecase';
import { GetTaskUseCase } from '@/modules/task/application/usecases/get-task.usecase';
import { TaskResponseDto } from '@/modules/task/presentation/dtos/task-response-dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
  ) {}

  async createTask(originalPath: string): Promise<TaskResponseDto> {
    const task = await this.createTaskUseCase.execute({ originalPath });
    return task.data as TaskResponseDto;
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<TaskResponseDto> {
    const updatedTask = await this.updateTaskUseCase.execute(id, task);
    return updatedTask as TaskResponseDto;
  }

  async getTask(id: string): Promise<TaskResponseDto> {
    const response = await this.getTaskUseCase.execute(id);
    return response.data as TaskResponseDto;
  }
}
