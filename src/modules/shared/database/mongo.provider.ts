import { MongooseModule } from "@nestjs/mongoose";

export const MongoProvider = MongooseModule.forRoot(
  process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb',
  {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
    waitQueueTimeoutMS: 30000,
    maxPoolSize: 10,
    minPoolSize: 1,
  }
);
