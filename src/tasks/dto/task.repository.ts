import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task-dto';
import { TaskStatus } from '../task-status';
import { GetTaskFilterDto } from './get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); // same task

    if (status) {
      query.andWhere('task.status =:status', { status }); //same task query!!!
    } // status is a name of variable of my query!!! and {}provides the VALUE
    // status ispolzuem v url dla filtra!
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', // LIKE its to match. LOWER -> toLowerCase
        { search: `%${search}%` }, //% pomogajet iskatj po chasti kotoraja match jesli "S" ishet vsjo s S -> Silik, sasha, Son e.t.c
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  // Добавляйте кастомные методы здесь
}
