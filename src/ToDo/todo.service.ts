import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ToDo } from '../entity/ToDo';
import { TodoStatus } from '../entity/ToDoStatus';
import { CreateToDoDto } from '../Dto/CreateToDoDto';
import { UpdateTodoDto } from '../Dto/UpdateTodoDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,
    @Inject('UUID')
    private readonly uuidv4: () => string,
  ) {}

  todos: ToDo[] = [
    new ToDo(
      '1',
      'Todo 1',
      'Description 1',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    ),
    new ToDo(
      '2',
      'Todo 2',
      'Description 2',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.InProgress,
    ),
    new ToDo(
      '3',
      'Todo 3',
      'Description 3',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Completed,
    ),
  ];

  getAllTodos(): ToDo[] {
    return this.todos;
  }

  createTodo(todoData: CreateToDoDto): ToDo {
    const newTodo = new ToDo(
      this.uuidv4(),
      todoData.name,
      todoData.description,
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    );
    this.todos.push(newTodo);
    return newTodo;
  }
  async addTodo(todoData: CreateToDoDto): Promise<ToDo> {
    const newTodo = new ToDo(
      this.uuidv4(),
      todoData.name,
      todoData.description,
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    );
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async getAllTodosDb(
    status: TodoStatus,
    key: string,
    page: number,
    size: number,
  ): Promise<{ todos: ToDo[]; total: number }> {
    const qb = this.todoRepository.createQueryBuilder('todo');

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

  getTodoById(id: string): ToDo {
    const result = this.todos.find((todo) => id === todo.id);
    if (result == null) {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
    return result;
  }

  async getTodoByIdDb(id: string): Promise<ToDo> {
    const result = this.todoRepository.findOneBy({ id: id });
    if (result == null) {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
    return result;
  }

  deleteTodoById(id: string): ToDo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    } else {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
  }

  async deleteTodoByIdDb(id: string): Promise<ToDo> {
    const todoDb = await this.todoRepository.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    return await this.todoRepository.remove(todoDb);
  }
  async restoreTodoById(id: string): Promise<void> {
    await this.todoRepository.restore(id);
  }

  updateTodoById(id: string, todoData: UpdateTodoDto): ToDo {
    const index = this.todos.findIndex((todo) => todo.id == id);
    if (index !== -1) {
      const updatedTodo = { ...this.todos[index], ...todoData };
      this.todos[index] = updatedTodo;
      return updatedTodo;
    } else {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
  }
  async updateTodoByIdDb(id: string, todoData: UpdateTodoDto): Promise<ToDo> {
    const todoDb = await this.todoRepository.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    todoDb.name = todoData.name ?? todoDb.name;
    todoDb.description = todoData.description ?? todoDb.description;
    todoDb.status = todoData.status ?? todoDb.status;
    await this.todoRepository.save(todoDb);
    return todoDb;
  }
  async getTodoNumberByStatus() {
    return {
      pending: await this.todoRepository.countBy({
        status: TodoStatus.Pending,
      }),
      inProgress: await this.todoRepository.countBy({
        status: TodoStatus.InProgress,
      }),
      completed: await this.todoRepository.countBy({
        status: TodoStatus.Completed,
      }),
    };
  }
}
