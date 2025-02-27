import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: ['originalPath must be a valid URL or local path'],
    type: [String]
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
} 