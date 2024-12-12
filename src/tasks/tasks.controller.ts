import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // If we haveany filters defined, call taskService.getTaskWilFilter
    // else, get all tasks
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
  @Patch('/:id/status') // for each parametr new patch !!!
  uptadeTaskStatus(
    @Param('id') id: string,
    @Body()
    updateTaskStatusDto: UpdateTaskStatusDto /* change from @Body('status') status: TaskStatus
     for validation data. Checking full body */,
  ): Task {
    const { status } = updateTaskStatusDto; // destructering to provide status!
    return this.taskService.updateTaskStatus(id, status);
  }
}
