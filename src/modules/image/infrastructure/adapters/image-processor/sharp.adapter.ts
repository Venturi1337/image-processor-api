import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { ImageProcessorPort } from '@/modules/image/application/ports/processor/image-processor.port';
import { ImageSourceFactory } from '@/modules/image/domain/image.source.factory';

@Injectable()
export class SharpProcessorAdapter implements ImageProcessorPort {
  constructor(private readonly imageSourceFactory: ImageSourceFactory) {}

  async process(
    inputPath: string,
    outputPath: string,
    resolution: number,
  ): Promise<string> {
    const imageSource = this.imageSourceFactory.create(inputPath);
    const imageBuffer = await imageSource.getImageBuffer(inputPath);

    const cleanOutputPath = outputPath.split('?')[0];

    await sharp(imageBuffer)
      .resize(resolution, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .toFile(outputPath);

    return cleanOutputPath;
  }
}
