import { Injectable } from '@nestjs/common';
import { FileImageSourceAdapter } from '../infrastructure/adapters/image-source/file-image-source.adapter';
import { UrlImageSourceAdapter } from '../infrastructure/adapters/image-source/url-image-source.adapter';
import { ImageSourcePort } from '../application/ports/source/image.source.port';

@Injectable()
export class ImageSourceFactory {
  constructor(
    private readonly urlImageSource: UrlImageSourceAdapter,
    private readonly fileImageSource: FileImageSourceAdapter,
  ) {}

  create(inputPath: string): ImageSourcePort {
    if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
      return this.urlImageSource;
    }
    return this.fileImageSource;
  }
}