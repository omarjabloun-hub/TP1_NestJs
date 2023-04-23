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
  private todos: ToDoEntity[] = [];
  constructor(
    @Inject('UUID') private readonly uuidv4: () => string,
    @InjectRepository(ToDoEntity)
    private readonly todoRepo: Repository<ToDoEntity>,
  ) {}
  getTodos() {
    return this.todoRepo.find();
  }
  async find(id: string) {
    return await this.todoRepo.findOne({ where: { id } });
  }
  delete(id: string): ToDoEntity[] {
    return this.todos.filter((x) => x.id != id);
  }
  async create(body: CreateToDoDto) {
    const todo = this.todoRepo.create({
      ...body,
      status: TodoStatus.Pending,
    });
    return await this.todoRepo.save(todo);
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

  async getAllTodosDb(
    status: TodoStatus,
    key: string,
    page: number,
    size: number,
  ): Promise<{ todos: ToDoEntity[]; total: number }> {
    const qb = this.todoRepo.createQueryBuilder('todo');

    if (key) {
      qb.andWhere('(todo.description LIKE :query OR todo.name LIKE :query)', {
        query: `%${key}%`,
      });
    }

    if (status) {
      qb.andWhere('todo.status = :status', { status });
    }

    const [todos, total] = await qb
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return { todos, total };
  }

  getTodoById(id: string): ToDoEntity {
    const result = this.todos.find((todo) => id === todo.id);
    if (result == null) {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
    return result;
  }

  async getTodoByIdDb(id: string): Promise<ToDoEntity> {
    const result = this.todoRepo.findOneBy({ id: id });
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

  async deleteTodoByIdDb(id: string): Promise<ToDoEntity> {
    const todoDb = await this.todoRepo.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    return await this.todoRepo.remove(todoDb);
  }
  async restoreTodoById(id: string): Promise<void> {
    await this.todoRepo.restore(id);
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
  async getTodoNumberByStatus() {
    return {
      pending: await this.todoRepo.countBy({
        status: TodoStatus.Pending,
      }),
      inProgress: await this.todoRepo.countBy({
        status: TodoStatus.InProgress,
      }),
      completed: await this.todoRepo.countBy({
        status: TodoStatus.Completed,
      }),
    };
  }
}
