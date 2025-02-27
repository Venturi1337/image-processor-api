import { Image } from '@/modules/image/domain/models/image.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ImageDocument = HydratedDocument<ImageEntity>;

@Schema({ timestamps: true })
export class ImageEntity implements Image {
  @Prop({ required: true, default: uuidv4 })
  _id?: string;

  @Prop({ required: true })
  taskId: string;

  @Prop({ required: true })
  resolution: number;

  @Prop({ required: true })
  path: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(ImageEntity);
export const ImageModel = model<ImageEntity>('Image', ImageSchema);
