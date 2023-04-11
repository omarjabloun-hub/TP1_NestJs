import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query, Version,
} from '@nestjs/common';
import { ToDo } from '../entity/ToDo';
import { TodoStatus } from '../entity/ToDoStatus';
import { CreateToDoDto } from '../Dto/CreateToDoDto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from '../Dto/UpdateTodoDto';
import { TodoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Version('1')
  getAllTodos(): ToDo[] {
    return this.todoService.getAllTodos();
  }

  @Get()
  @Version('2')
    async getAllTodosV2(@Query('status') status:TodoStatus,
                        @Query('key') key: string,
                        @Query('page') page: number = 1,
                        @Query('size') size: number = 10
  ): Promise<ToDo[]> {
      return await this.todoService.getAllTodosDb(status,key,page,size);
  }


  @Post()
  @Version('2')
  async createTodo(@Body() todoData: CreateToDoDto): Promise<ToDo> {
    return await this.todoService.addTodo(todoData);
  }

  @Get('/statusNumber')
  async getTodoNumberByStatus() {
    return await this.todoService.getTodoNumberByStatus();
  }

  @Get(':id')
  @Version('1')
  getTodoById(@Param('id') id: string): ToDo {
    return this.todoService.getTodoById(id);
  }

  @Get(':id')
  @Version('2')
  async getTodoByIdDb(@Param('id') id: string): Promise<ToDo> {
    return this.todoService.getTodoByIdDb(id);
  }

  @Delete(':id')
  @Version('1')
  deleteTodoById(@Param('id') id: string): ToDo {
    return this.todoService.deleteTodoById(id);
  }

  @Patch(':id')
  @Version('1')
  async updateTodoById(
    @Param('id') id: string,
    @Body() todoData: UpdateTodoDto,
  ): Promise<ToDo> {
    return await this.todoService.updateTodoByIdDb(id, todoData);
  }



}
