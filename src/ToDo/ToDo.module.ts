import { Module } from '@nestjs/common';
import { ToDoController } from './ToDo.controller';
import { TodoService } from './todo.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [],
  controllers: [ToDoController],
  providers: [TodoService],
})
export class ToDoModule {}
