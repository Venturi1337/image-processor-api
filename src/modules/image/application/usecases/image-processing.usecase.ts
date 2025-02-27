import { Inject, Injectable } from '@nestjs/common';
import { ImageFactory } from '@/modules/image/domain/image.factory';
import { ImageRepositoryPort } from '@/modules/image/domain/repositories/image.repository';

@Injectable()
export class ImageProcessingUseCase {
  constructor(
    private readonly imageFactory: ImageFactory,
    @Inject('ImageRepository')
    private readonly imageRepository: ImageRepositoryPort,
  ) {}

  async execute(data: any) {
    try {
      const { taskId, originalPath } = data;

      const imageVariants =
        await this.imageFactory.createVariants(originalPath);

      const imagePromises = imageVariants.map((image) =>
        this.imageRepository.create({
          ...image,
          taskId,
        }),
      );
      return await Promise.all(imagePromises);
    } catch (error) {
      throw new Error(`Error processing image: ${error}`);
    }
  }
}
