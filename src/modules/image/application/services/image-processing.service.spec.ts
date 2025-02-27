import { Test, TestingModule } from '@nestjs/testing';
import { ImageProcessingService } from './image-processing.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageProcessingUseCase } from '@/modules/image/application/usecases/image-processing.usecase';

describe('ImageProcessingService', () => {
  let service: ImageProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageProcessingService,
        {
          provide: ImageProcessingUseCase,
          useValue: { /* mock implementation */ },
        },
        {
          provide: EventEmitter2,
          useValue: { /* mock implementation */ },
        },
      ],
    }).compile();

    service = module.get<ImageProcessingService>(ImageProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
