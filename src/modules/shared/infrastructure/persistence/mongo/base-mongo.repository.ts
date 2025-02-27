import { Model } from 'mongoose';
import { BaseRepositoryPort } from '@/modules/shared/domain/ports/base.repository.port';

export class MongoRepository<T> implements BaseRepositoryPort<T> {
  constructor(private readonly model: Model<T>) {}

  async create(entity: Partial<T>): Promise<T> {
    const newDocument = new this.model(entity);
    const savedDocument = await newDocument.save();
    if (!savedDocument) {
      throw new Error('Document not saved');
    }
    return savedDocument.toObject() as T;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, entity, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
