import {
    Body,
    Controller, Delete,
    Get, Param, Patch,
    Post
} from '@nestjs/common';
import {ToDoModel} from './ToDoModel';
import {TodoStatus} from "./ToDoStatus";
import {CreateToDoDto} from "./CreateToDoDto"
import { v4 as uuidv4 } from 'uuid';
import {UpdateTodoDto} from "./UpdateTodoDto";
import {TodoService} from "./todo.service";


@Controller('todo')
export class ToDoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getAllTodos(): ToDoModel[] {
        return this.todoService.getAllTodos();
    }

    @Post()
    createTodo(@Body() todoData: CreateToDoDto): ToDoModel {
        return this.todoService.createTodo(todoData);
    }

    @Get(':id')
    getTodoById(@Param('id') id: string): ToDoModel {
        return this.todoService.getTodoById(id);
    }

    @Delete(':id')
    deleteTodoById(@Param('id') id: string): ToDoModel {
        return this.todoService.deleteTodoById(id);
    }


    @Patch(':id')
    updateTodoById(@Param('id') id: string, @Body() todoData: UpdateTodoDto): ToDoModel {
        return this.todoService.updateTodoById(id,todoData);
    }

}
