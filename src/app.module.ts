import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskModule } from './modules/task/task.module';
import { ImageModule } from './modules/image/image.module';
import { HttpExceptionFilter } from './modules/shared/infrastructure/filters/global-exception.filter';

@Module({
  imports: [
    TaskModule,
    ImageModule,
    EventEmitterModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}