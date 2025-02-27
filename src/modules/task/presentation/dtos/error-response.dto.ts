import { ApiProperty } from '@nestjs/swagger';

export class TaskErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Task not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
} 