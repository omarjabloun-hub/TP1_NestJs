import { Module } from '@nestjs/common';
import { ToDoController } from './ToDo.controller';
import { TodoService } from './todo.service';
import { ToDoEntity } from './entities/ToDoEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity])],
  controllers: [ToDoController],
  providers: [TodoService],
})
export class ToDoModule {}
