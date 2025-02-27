import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskEventTypes } from '@/modules/task/application/events/task.event-types';
import { TaskService } from '@/modules/task/application/services/task.service';
import { TaskEventDto } from '@/modules/task/application/events/dtos/update-task.event.dto';

@Injectable()
export class TaskCompletedListener {
  constructor(private readonly taskService: TaskService) {}

  @OnEvent(TaskEventTypes.TASK_COMPLETED)
  async handleTaskCompleted(event: TaskEventDto) {
    console.log(`TASK COMPLETED: ${JSON.stringify(event)}`);
    if (!event.taskId) {
      throw new Error('Task ID is required');
    }

    await this.taskService.updateTask(event.taskId!, {
      status: event.status,
      images: event.images,
    });
  }
}
