import { Module } from '@nestjs/common';
import { ToDoController } from './ToDo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from '../common/common.module';
import { ToDoModel } from './ToDoModel';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoModel])],
  controllers: [ToDoController],
  providers: [TodoService],
})
export class ToDoModule {}
