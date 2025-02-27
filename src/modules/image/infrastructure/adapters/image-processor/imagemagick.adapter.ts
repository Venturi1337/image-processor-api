import { Injectable } from '@nestjs/common';
import * as im from 'imagemagick';
import { ImageProcessorPort } from '@/modules/image/application/ports/processor/image-processor.port';
import { writeFile, unlink } from 'fs/promises';
import { ImageSourceFactory } from '@/modules/image/domain/image.source.factory';

@Injectable()
export class ImageMagickProcessorAdapter implements ImageProcessorPort {
  constructor(private readonly imageSourceFactory: ImageSourceFactory) {}

  async process(
    inputPath: string,
    outputPath: string,
    resolution: number,
  ): Promise<string> {
    const imageSource = this.imageSourceFactory.create(inputPath);
    const imageBuffer = await imageSource.getImageBuffer(inputPath);

    const tempInputPath = `${outputPath}.temp`;
    await writeFile(tempInputPath, imageBuffer);

    await im.convert([
      tempInputPath,
      '-resize',
      `${resolution}x${resolution}`,
      outputPath,
    ]);

    await unlink(tempInputPath);
    
    const cleanOutputPath = outputPath.split('?')[0];

    return cleanOutputPath;
  }
}
