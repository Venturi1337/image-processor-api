import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Image } from './models/image.model';
import { Md5HashGeneratorAdapter } from '@/modules/image/infrastructure/adapters/hash/md5-hash-generator.adapter';
import { ImageProcessorPort } from '@/modules/image/application/ports/processor/image-processor.port';

@Injectable()
export class ImageFactory {
  private readonly DEFAULT_RESOLUTIONS = [800, 1024];
  private readonly INPUT_DIR = 'input';
  private readonly OUTPUT_DIR = 'output';

  constructor(
    private readonly md5HashGenerator: Md5HashGeneratorAdapter,
    @Inject('ImageProcessor')
    private readonly imageProcessor: ImageProcessorPort,
  ) {}

  async createVariants(
    originalPath: string,
    resolutions: number[] = this.DEFAULT_RESOLUTIONS,
  ): Promise<Image[]> {
    const isUrl =
      originalPath.startsWith('http://') || originalPath.startsWith('https://');

    const absoluteInputPath = isUrl
      ? originalPath
      : path.join(process.cwd(), this.INPUT_DIR, originalPath);

    const images: Image[] = [];
    try {
      if (!isUrl) {
        const exists = await fs.promises
          .access(absoluteInputPath)
          .then(() => true)
          .catch(() => false);
        if (!exists)
          throw new Error(`Input file not found: ${absoluteInputPath}`);
      }

      for (const resolution of resolutions) {
        const outputPath: string = this.generateImagePath(
          originalPath,
          resolution,
        );
        const absoluteOutputPath = path.join(process.cwd(), outputPath);
        const cleanOutputPath = outputPath.split('?')[0];

        await fs.promises.mkdir(path.dirname(absoluteOutputPath), {
          recursive: true,
        });

        await this.imageProcessor.process(
          absoluteInputPath,
          absoluteOutputPath,
          resolution,
        );

        images.push(new Image({ path: cleanOutputPath, resolution }));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to process image: ${errorMessage}`);
    }

    return images;
  }

  generateImagePath(originalPath: string, resolution: number) {
    const md5Hash: string = this.md5HashGenerator.generate(originalPath);
    const ext: string = path.extname(originalPath);
    const filename: string = path.basename(originalPath, ext);
    const timestamp = Date.now();

    const processedPath: string = path.join(
      this.OUTPUT_DIR,
      filename,
      resolution.toString(),
      `${md5Hash}_${timestamp}${ext}`,
    );

    return processedPath;
  }
}
