import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TaskEventTypes } from '@/modules/task/application/events/task.event-types';
import { ImageEventTypes } from '@/modules/image/application/events/image.event-types.enum';
import { TaskEventDto } from '@/modules/task/application/events/dtos/update-task.event.dto';

@Injectable()
export class TaskCreatedListener {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(TaskEventTypes.TASK_CREATED)
  async handleTaskCreated(event: TaskEventDto) {
    console.log(`TASK CREATED: ${JSON.stringify(event)}`);
    const { taskId, originalPath } = event;

    this.eventEmitter.emit(ImageEventTypes.IMAGE_PROCESS_START, {
      taskId,
      originalPath,
    });
  }
}
