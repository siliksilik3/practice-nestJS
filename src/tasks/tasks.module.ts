import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './dto/task.repository';
import { Task } from './dto/task.entity';
import { DataSource } from 'typeorm';  // DataSource — это класс из TypeORM, который отвечает за управление подключением к базе данных.

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TaskRepository,
      useFactory: (dataSource: DataSource) => new TaskRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [TaskRepository],
})
export class TasksModule {}
