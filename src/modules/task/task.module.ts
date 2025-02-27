import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MongoProvider } from '../shared/database/mongo.provider';
import { TaskService } from '@/modules/task/application/services/task.service';
import {
  GetTaskUseCase,
  CreateTaskUseCase,
  UpdateTaskUseCase,
} from '@/modules/task/application/usecases';
import { TaskController } from '@/modules/task/presentation/controllers/task.controller';
import {
  TaskEntity,
  TaskSchema,
} from '@/modules/task/infrastructure/schemas/task.schema';
import { TaskMongoRepository } from '@/modules/task/infrastructure/adapters/mongo/mongo-task.repository';
import { TaskFactory } from '@/modules/task/domain/task.factory';
import { TaskCreatedListener } from '@/modules/task/infrastructure/adapters/events/listeners/task-created.listener';
import { TaskCompletedListener } from './infrastructure/adapters/events/listeners/task-completed.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongoProvider,
    MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }]),
    EventEmitterModule.forRoot(),
  ],
  providers: [
    TaskService,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    GetTaskUseCase,
    {
      provide: 'TaskRepository',
      useClass: TaskMongoRepository,
    },
    TaskFactory,
    TaskCreatedListener,
    TaskCompletedListener,
  ],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
