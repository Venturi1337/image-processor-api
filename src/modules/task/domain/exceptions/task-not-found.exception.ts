import { BaseException } from '@/modules/shared/domain/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends BaseException {
  constructor(taskId: string) {
    super(`Task with ID ${taskId} not found`, HttpStatus.NOT_FOUND);
    this.name = 'TaskNotFoundException';
  }
}
