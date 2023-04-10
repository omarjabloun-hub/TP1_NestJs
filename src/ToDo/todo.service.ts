import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ToDoModel } from './ToDoModel';
import { TodoStatus } from './ToDoStatus';
import { CreateToDoDto } from './CreateToDoDto';
import { UpdateTodoDto } from './UpdateTodoDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDoModel)
    private todoRepository: Repository<ToDoModel>,
    @Inject('UUID')
    private readonly uuidv4: () => string,
  ) {}

  todos: ToDoModel[] = [
    new ToDoModel(
      '1',
      'Todo 1',
      'Description 1',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Pending,
    ),
    new ToDoModel(
      '2',
      'Todo 2',
      'Description 2',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.InProgress,
    ),
    new ToDoModel(
      '3',
      'Todo 3',
      'Description 3',
      new Date(),
      new Date(),
      new Date(),
      TodoStatus.Completed,
    ),
  ];

  getAllTodos(): ToDoModel[] {
    return this.todos;
  }

  createTodo(todoData: CreateToDoDto): ToDoModel {
    const newTodo = new ToDoModel(
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
  async addTodo(todoData: CreateToDoDto): Promise<ToDoModel> {
    const newTodo = new ToDoModel(
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

  getTodoById(id: string): ToDoModel {
    const result = this.todos.find((todo) => id === todo.id);
    if (result == null) {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
    return result;
  }

  deleteTodoById(id: string): ToDoModel {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    } else {
      throw new NotFoundException('Todo Not found with id ' + id);
    }
  }

  async deleteTodoByIdDb(id: string): Promise<ToDoModel> {
    const todoDb = await this.todoRepository.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    return await this.todoRepository.remove(todoDb);
  }
  async restoreTodoById(id: string): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id, deletedAt: Not(null) },
    });
    if (!todo) {
      throw new NotFoundException(
        `Todo with ID ${id} not found or not deleted`,
      );
    }

    // Restore the deleted entity
    todo.deletedAt = null;
    await this.todoRepository.save(todo);
  }

  updateTodoById(id: string, todoData: UpdateTodoDto): ToDoModel {
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
  ): Promise<ToDoModel> {
    const todoDb = await this.todoRepository.findOneBy({ id: id });
    if (!todoDb) throw new NotFoundException('Todo Not found with id ' + id);
    todoDb.name = todoData.name ?? todoDb.name;
    todoDb.description = todoData.description ?? todoDb.description;
    todoDb.status = todoData.status ?? todoDb.status;
    await this.todoRepository.save(todoDb);
    return todoDb;
  }
}
