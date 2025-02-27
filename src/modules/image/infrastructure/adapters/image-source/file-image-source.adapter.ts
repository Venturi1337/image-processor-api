import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { ImageSourcePort } from '@/modules/image/application/ports/source/image.source.port';
@Injectable()
export class FileImageSourceAdapter implements ImageSourcePort {
  async getImageBuffer(inputPath: string): Promise<Buffer> {
    return await readFile(inputPath);
  }
} 