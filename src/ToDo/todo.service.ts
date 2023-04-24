import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { ToDoEntity } from './entities/ToDoEntity';
import { TodoStatus } from '../entity/ToDoStatus';
import { CreateToDoDto } from '../Dto/CreateToDoDto';
import { UpdateTodoDto } from '../Dto/UpdateTodoDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private todos: ToDoEntity[] = [
    new ToDoEntity(
      '1',
      'Todo 1',
      'Description 1',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    ),
    new ToDoEntity(
      '2',
      'Todo 2',
      'Description 2',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.InProgress,
    ),
    new ToDoEntity(
      '3',
      'Todo 3',
      'Description 3',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Completed,
    ),
  ];
  constructor(
    @Inject('UUID') private readonly uuidv4: () => string,
    @InjectRepository(ToDoEntity)
    private readonly todoRepo: Repository<ToDoEntity>,
  ) {}
  async find(id: string) {
    const result = await this.todoRepo.findOne({ where: { id } });
    if (!result) throw new NotFoundException('Todo Not found with id ' + id);
    return result;
  }
  async create(body: CreateToDoDto) {
    const todo = this.todoRepo.create({
      ...body,
      status: TodoStatus.Pending,
    });
    return await this.todoRepo.save(todo);
  }
  async updateTodoByIdDb(
    id: string,
    todoData: UpdateTodoDto,
  ): Promise<ToDoEntity> {
    const todoDb = await this.todoRepo.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    todoDb.name = todoData.name ?? todoDb.name;
    todoDb.description = todoData.description ?? todoDb.description;
    todoDb.status = todoData.status ?? todoDb.status;
    await this.todoRepo.save(todoDb);
    return todoDb;
  }

  async deleteTodoByIdDb(id: string): Promise<ToDoEntity> {
    const todoDb = await this.todoRepo.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    return await this.todoRepo.softRemove(todoDb);
  }
  async restoreTodoById(id: string) {
    return await this.todoRepo.restore(id);
  }
  async getAllTodosDb(
    page: number,
    size: number,
    status: TodoStatus,
    key: string,
  ) {
    const qb = this.todoRepo
      .createQueryBuilder()
      .select('todo')
      .from(ToDoEntity, 'todo');

    if (status)
      qb.andWhere('todo.status = :status', { status: status.toString() });
    if (key)
      qb.andWhere('todo.name LIKE :query OR todo.description LIKE :query', {
        query: `%${key}%`,
      });

    return await qb
      .offset((page - 1) * size)
      .limit(size)
      .getMany();
  }
  async getTodoNumberByStatus() {
    return {
      pending: await this.todoRepo.count({
        where: { status: TodoStatus.Pending },
      }),
      inProgress: await this.todoRepo.count({
        where: { status: TodoStatus.InProgress },
      }),
      completed: await this.todoRepo.count({
        where: { status: TodoStatus.Completed },
      }),
    };
  }
  // In local memory
  delete(id: string): ToDoEntity[] {
    return this.todos.filter((x) => x.id != id);
  }
  async addTodo(todoData: CreateToDoDto): Promise<ToDoEntity> {
    const newTodo = new ToDoEntity(
      uuidv4(),
      todoData.name,
      todoData.description,
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    );
    await this.todoRepo.save(newTodo);
    return newTodo;
  }
  getTodoById(id: string): ToDoEntity {
    const result = this.todos.find((todo) => id === todo.id);
    if (result == null) {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
    return result;
  }
  deleteTodoById(id: string): ToDoEntity {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    } else {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
  }

  updateTodoById(id: string, todoData: UpdateTodoDto): ToDoEntity {
    const index = this.todos.findIndex((todo) => todo.id == id);
    if (index !== -1) {
      const updatedTodo = { ...this.todos[index], ...todoData };
      this.todos[index] = updatedTodo;
      return updatedTodo;
    } else {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
  }
  edit(body: UpdateTodoDto, id: string): ToDoEntity[] {
    const todo = this.todos.filter((x) => x.id == id)[0];
    if (!todo) return this.todos;
    todo.description = body.description;
    todo.status = body.status;
    todo.name = body.name;
    return this.todos.map((prevTodo) => {
      if (prevTodo.id === id) {
        return todo;
      }
      return prevTodo;
    });
  }
}
