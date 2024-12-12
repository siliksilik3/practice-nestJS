import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();
    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    //do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    //return final result
    return tasks;
  }
  getTaskById(id: string): Task {
    // try to get task

    // if not found, throw an error (404 not found)

    // otherwise, return found task
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(/* can write some custom message */); // pipe response 404 not found
    }
    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id); // to check if id exist same error 404 not found
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
