import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TaskService } from '@/modules/task/application/services/task.service';
import { CreateTaskDto } from '@/modules/task/presentation/dtos/create-task.dto';
import { TaskResponseDto } from '@/modules/task/presentation/dtos/task-response-dto';
import { ErrorResponseDto } from '@/modules/task/presentation/dtos/error-response.dto';
import { ValidationErrorResponseDto } from '@/modules/task/presentation/dtos/validation-error-response.dto';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input',
    type: ValidationErrorResponseDto
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto
  })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.createTask(createTaskDto.originalPath);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Task found successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorResponseDto
  })
  async getTask(@Param('id') id: string): Promise<TaskResponseDto> {
    return await this.taskService.getTask(id);
  }
}
