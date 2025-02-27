import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The original path or URL of the task',
    example: 'https://example.com/resource',
    required: true
  })
  @IsString()
  @IsUrl({}, { message: 'Must be a valid URL or local path' })
  originalPath!: string;
}
