import axios from 'axios';
import { ImageSourcePort } from '@/modules/image/application/ports/source/image.source.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlImageSourceAdapter implements ImageSourcePort {
  async getImageBuffer(inputPath: string): Promise<Buffer> {
    const response = await axios.get(inputPath, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data);
  }
}