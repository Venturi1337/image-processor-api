import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { ValidationPipe, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb';
    console.log('Connecting to MongoDB...', { uri: mongoUri?.split('?')[0] });

    await mongoose.connect(mongoUri as string);

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST
    }));

    const config = new DocumentBuilder()
      .setTitle('Task API')
      .setDescription('The task API description')
      .setVersion('1.0')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
  } catch (error) {
    console.error('❌ Fatal error during application bootstrap:', error);
    process.exit(1);
  }
}
bootstrap();
