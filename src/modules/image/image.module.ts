import { Module } from '@nestjs/common';
import { MongoProvider } from '@/modules/shared/database/mongo.provider';
import { ImageProcessingService } from '@/modules/image/application/services/image-processing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageEntity, ImageSchema } from '@/modules/image/infrastructure/schemas/image.schema';
import { ImageMongoRepository } from '@/modules/image/infrastructure/adapters/mongo/mongo-image.repository';
import { ImageFactory } from '@/modules/image/domain/image.factory';
import { ImageProcessingUseCase } from '@/modules/image/application/usecases/image-processing.usecase';
import { ImageProcessListener } from '@/modules/image/infrastructure/adapters/events/listeners/image-process.listener';
import { Md5HashGeneratorAdapter } from './infrastructure/adapters/hash/md5-hash-generator.adapter';
import { SharpProcessorAdapter } from '@/modules/image/infrastructure/adapters/image-processor/sharp.adapter';
import { ImageSourceFactory } from '@/modules/image/domain/image.source.factory';
import { UrlImageSourceAdapter } from '@/modules/image/infrastructure/adapters/image-source/url-image-source.adapter';
import { FileImageSourceAdapter } from '@/modules/image/infrastructure/adapters/image-source/file-image-source.adapter';
import { ImageMagickProcessorAdapter } from '@/modules/image/infrastructure/adapters/image-processor/imagemagick.adapter';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([
      { name: ImageEntity.name, schema: ImageSchema },
    ]),
  ],
  providers: [
    ImageProcessingService,
    ImageFactory,
    ImageProcessingUseCase,
    ImageProcessListener,
    Md5HashGeneratorAdapter,
    { provide: 'ImageProcessor', useClass: SharpProcessorAdapter },
    {
      provide: 'ImageRepository',
      useClass: ImageMongoRepository,
    },
    UrlImageSourceAdapter,
    FileImageSourceAdapter,
    ImageSourceFactory,
    ImageMagickProcessorAdapter,
  ],

  exports: [ImageProcessingService],
})
export class ImageModule {}