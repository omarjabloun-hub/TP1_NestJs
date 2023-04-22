import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import {ToDoEntity} from "./entities/ToDoEntity";
import {TodoStatus} from "../entity/ToDoStatus";
import {CreateToDoDto} from "../Dto/CreateToDoDto";
import {UpdateTodoDto} from "../Dto/UpdateTodoDto";

@Injectable()
export class TodoService {
  private todos : ToDoEntity[] = [] ;
  constructor(@InjectRepository(ToDoEntity) private readonly todoRepo : Repository<ToDoEntity>) {}
  getTodos(){
    return this.todoRepo.find() ;
  }
  async find(id : string) {
    return await this.todoRepo.findOne({where : {id}}) ;
  }
  delete(id : string) : ToDoEntity[]{
    return this.todos.filter(x => x.id != id) ;
  }
  async create(body : CreateToDoDto) {
    const todo = this.todoRepo.create( {
      ...body,
      status : TodoStatus.Pending
    }) ;
    return await this.todoRepo.save(todo) ;
  }
  edit(body : UpdateTodoDto, id : string) : ToDoEntity[] {
    const todo = this.todos.filter(x => x.id == id)[0] ;
    if(!todo)
      return this.todos;
    todo.description = body.description ;
    todo.status = body.status ;
    todo.name = body.name ;
    return this.todos.map(prevTodo => {
      if (prevTodo.id === id) {
        return todo;
      }
      return prevTodo;
    });
  }
}
