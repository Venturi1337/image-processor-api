import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@/modules/shared/domain/exceptions/base.exception';

export class UpdateTaskException extends BaseException {
  constructor(message: string) {
    super(`Failed to update task: ${message}`, HttpStatus.BAD_REQUEST);
    this.name = 'UpdateTaskException';
  }
}
