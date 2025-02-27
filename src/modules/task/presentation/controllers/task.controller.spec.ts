import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskService } from '@/modules/task/application/services/task.service';
import { TaskController } from '@/modules/task/presentation/controllers/task.controller';
import { CreateTaskUseCase } from '@/modules/task/application/usecases/create-task.usecase';
import { GetTaskUseCase } from '@/modules/task/application/usecases/get-task.usecase';
import { UpdateTaskUseCase } from '@/modules/task/application/usecases/update-task.usecase';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: CreateTaskUseCase,
          useValue: {},
        },
        {
          provide: UpdateTaskUseCase,
          useValue: {},
        },
        {
          provide: GetTaskUseCase,
          useValue: {},
        },
        {
          provide: EventEmitter2,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
