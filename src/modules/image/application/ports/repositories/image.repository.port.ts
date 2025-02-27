import { Image } from "@/modules/image/domain/models/image.model";

export interface ImageRepositoryPort {
  create(image: Image): Promise<Image>;
}
    