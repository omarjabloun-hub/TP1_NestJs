import {
    Controller,
    Get
} from '@nestjs/common';
// @ts-ignore
import { TodoModel, TodoStatus } from './/tp1_gl/src/to-do';

@Controller('to-do')
export class ToDoController {

    todos: TodoModel[] = [
        new TodoModel(1, 'Todo 1', 'Description 1', new Date(), TodoStatus.Pending),
        new TodoModel(2, 'Todo 2', 'Description 2', new Date(), TodoStatus.InProgress),
        new TodoModel(3, 'Todo 3', 'Description 3', new Date(), TodoStatus.Completed),
    ];

    @Get()
    getAllTodos(): TodoModel[] {
        return this.todos;
    }
}
