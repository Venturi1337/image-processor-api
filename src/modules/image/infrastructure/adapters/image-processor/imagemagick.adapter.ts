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
    // Get image buffer from appropriate source
    const imageSource = this.imageSourceFactory.create(inputPath);
    const imageBuffer = await imageSource.getImageBuffer(inputPath);

    // Write buffer to temporary file for ImageMagick
    const tempInputPath = `${outputPath}.temp`;
    await writeFile(tempInputPath, imageBuffer);

    // Process the image
    await im.convert([
      tempInputPath,
      '-resize',
      `${resolution}x${resolution}`,
      outputPath,
    ]);

    // Clean up temporary file
    await unlink(tempInputPath);

    return outputPath;
  }

}
