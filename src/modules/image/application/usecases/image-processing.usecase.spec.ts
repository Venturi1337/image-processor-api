import { Test } from '@nestjs/testing';
import { ImageProcessingUseCase } from '@/modules/image/application/usecases/image-processing.usecase';
import { ImageFactory } from '@/modules/image/domain/image.factory';
import { ImageRepositoryPort } from '@/modules/image/domain/repositories/image.repository';
import { Image } from '../../domain/models/image.model';

describe('ImageProcessingUseCase', () => {
  let useCase: ImageProcessingUseCase;
  let imageFactory: ImageFactory;
  let imageRepository: ImageRepositoryPort;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ImageProcessingUseCase,
        {
          provide: ImageFactory,
          useValue: {
            createVariants: jest.fn(),
          },
        },
        {
          provide: 'ImageRepository',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = moduleRef.get<ImageProcessingUseCase>(ImageProcessingUseCase);
    imageFactory = moduleRef.get<ImageFactory>(ImageFactory);
    imageRepository = moduleRef.get<ImageRepositoryPort>('ImageRepository');
  });

  it('should process images successfully', async () => {
    const mockData = {
      taskId: 'task-123',
      originalPath: '/path/to/image.jpg',
    };

    const mockImageVariants: Image[] = [
      {
        path: '/processed/1.jpg',
        taskId: 'task-123',
        resolution: 1024,
        createdAt: new Date(),
      },
      {
        path: '/processed/2.jpg',
        taskId: 'task-123',
        resolution: 1024,
        createdAt: new Date(),
      },
    ];

    const mockCreatedImages: Partial<Image>[] = [
      {
        path: '/processed/1.jpg',
        taskId: 'task-123',
        resolution: 1024,
        createdAt: new Date(),
      },
      {
        path: '/processed/2.jpg',
        taskId: 'task-123',
        resolution: 1024,
        createdAt: new Date(),
      },
    ];

    jest
      .spyOn(imageFactory, 'createVariants')
      .mockResolvedValue(mockImageVariants);
    jest
      .spyOn(imageRepository, 'create')
      .mockImplementation(async (data) => data);

    const result = await useCase.execute(mockData);

    expect(imageFactory.createVariants).toHaveBeenCalledWith(
      mockData.originalPath,
    );
    expect(imageRepository.create).toHaveBeenCalledTimes(2);
    expect(result).toEqual(mockCreatedImages);
  });

  it('should throw error when processing fails', async () => {
    // Arrange
    const mockData = {
      taskId: 'task-123',
      originalPath: '/path/to/image.jpg',
    };

    const error = new Error('Failed to process image');
    jest.spyOn(imageFactory, 'createVariants').mockRejectedValue(error);

    await expect(useCase.execute(mockData)).rejects.toThrow(
      'Error processing image: Error: Failed to process image',
    );
  });
});
