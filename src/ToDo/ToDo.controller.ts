import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ToDoEntity } from './entities/ToDoEntity';
import { TodoStatus } from '../entity/ToDoStatus';
import { CreateToDoDto } from '../Dto/CreateToDoDto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from '../Dto/UpdateTodoDto';
import { TodoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Version('2')
  async getAllTodosV2(
    @Query('status') status: TodoStatus,
    @Query('key') key: string,
    @Query('page') page = 1,
    @Query('size') size = 10,
  ): Promise<ToDoEntity[]> {
    return await this.todoService.getAllTodosDb(page, size, status, key);
  }

  @Post()
  @Version('2')
  async createTodo(@Body() todoData: CreateToDoDto): Promise<ToDoEntity> {
    return await this.todoService.create(todoData);
  }
  @Post('restore/:id')
  @Version('2')
  async restoreTodo(@Param('id') id: string) {
    return await this.todoService.restoreTodoById(id);
  }
  @Get('/statusNumber')
  async getTodoNumberByStatus() {
    return await this.todoService.getTodoNumberByStatus();
  }
  @Get(':id')
  @Version('2')
  async getTodoByIdDb(@Param('id') id: string): Promise<ToDoEntity> {
    return this.todoService.find(id);
  }
  @Post(':id')
  @Version('2')
  async updateTodoByIdDb(
    @Param('id') id: string,
    @Body() todoData: UpdateTodoDto,
  ): Promise<ToDoEntity> {
    return await this.todoService.updateTodoByIdDb(id, todoData);
  }
  @Delete(':id')
  @Version('2')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoByIdDb(id);
  }

  // @Get(':id')
  // @Version('1')
  // getTodoById(@Param('id') id: string): ToDoEntity {
  //   return this.todoService.getTodoById(id);
  // }

  // @Delete(':id')
  // @Version('1')
  // deleteTodoById(@Param('id') id: string): ToDoEntity {
  //   return this.todoService.deleteTodoById(id);
  // }

  // @Patch(':id')
  // @Version('1')
  // async updateTodoById(
  //   @Param('id') id: string,
  //   @Body() todoData: UpdateTodoDto,
  // ): Promise<ToDoEntity> {
  //   return await this.todoService.updateTodoByIdDb(id, todoData);
  // }
}
