import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageProcessingUseCase } from '@/modules/image/application/usecases/image-processing.usecase';
import { TaskEventTypes } from '@/modules/task/application/events/task.event-types';
import { TaskStatus } from '@/modules/task/domain/models/task.model';
import { ImageProcessEventDto } from '@/modules/image/application/events/dtos/image-process-start.event.dto';

@Injectable()
export class ImageProcessingService {
  constructor(
    private readonly imageProcessingUseCase: ImageProcessingUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async processImage(dto: ImageProcessEventDto) {
    let status: TaskStatus = TaskStatus.COMPLETED;
    let processedImages: any[] = [];
    let processError = null;

    try {
      processedImages = await this.imageProcessingUseCase.execute(dto);
    } catch (error) {
      status = TaskStatus.FAILED;
      processError = error.message;
    }

    this.eventEmitter.emit(TaskEventTypes.TASK_COMPLETED, {
      taskId: dto.taskId,
      status,
      images: processedImages,
      error: processError,
    });
  }
}
