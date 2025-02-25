import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskModule } from './modules/task/task.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [TaskModule, ImageModule, EventEmitterModule.forRoot()],
})
export class AppModule {}
 