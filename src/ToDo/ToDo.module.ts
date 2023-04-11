import { Module } from '@nestjs/common';
import { ToDoController } from './ToDo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from '../common/common.module';
import { ToDo } from '../entity/ToDo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  controllers: [ToDoController],
  providers: [TodoService],
})
export class ToDoModule {}
