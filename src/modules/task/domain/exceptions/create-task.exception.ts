import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@/modules/shared/domain/exceptions/base.exception';

export class CreateTaskException extends BaseException {
  constructor(message: string) {
    super(`Failed to create task: ${message}`, HttpStatus.BAD_REQUEST);
    this.name = 'CreateTaskException';
  }
}
