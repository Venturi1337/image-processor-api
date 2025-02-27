import { Injectable } from '@nestjs/common';
import {
  ImageEntity,
  ImageModel,
} from '@/modules/image/infrastructure/schemas/image.schema';
import { MongoRepository } from '@/modules/shared/infrastructure/persistence/mongo/base-mongo.repository';
import { ImageRepositoryPort } from '@/modules/image/domain/repositories/image.repository';
import { Image } from '@/modules/image/domain/models/image.model';

@Injectable()
export class ImageMongoRepository
  extends MongoRepository<ImageEntity>
  implements ImageRepositoryPort
{
  constructor() {
    super(ImageModel);
  }

  async create(image: Partial<Image>): Promise<ImageEntity> {
    const createdImage = await super.create(image);
    return createdImage;
  }
}
