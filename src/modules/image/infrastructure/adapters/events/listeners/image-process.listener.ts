import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ImageEventTypes } from '@/modules/image/application/events/image.event-types.enum';
import { ImageProcessingService } from '@/modules/image/application/services/image-processing.service';
import { ImageProcessEventDto } from '@/modules/image/application/events/dtos/image-process-start.event.dto';

@Injectable()
export class ImageProcessListener {
  constructor(
    private readonly imageProcessingService: ImageProcessingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(ImageEventTypes.IMAGE_PROCESS_START)
  async handleImageProcessStart(event: ImageProcessEventDto) {
    console.log(`IMAGE PROCESS START: ${JSON.stringify(event)}`);

    await this.imageProcessingService.processImage(event);
  }
}
