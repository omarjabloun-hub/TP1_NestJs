import {Body, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ToDoModel} from "./ToDoModel";
import {TodoStatus} from "./ToDoStatus";
import {CreateToDoDto} from "./CreateToDoDto";
import {UpdateTodoDto} from "./UpdateTodoDto";
import {NotFoundError} from "rxjs";

@Injectable()
export class TodoService {

    constructor(
        @Inject('UUID') private readonly uuidv4: () => string,
    ) {}

    todos: ToDoModel[] = [
        new ToDoModel("1", 'Todo 1', 'Description 1', new Date(), TodoStatus.Pending),
        new ToDoModel("2", 'Todo 2', 'Description 2', new Date(), TodoStatus.InProgress),
        new ToDoModel("3", 'Todo 3', 'Description 3', new Date(), TodoStatus.Completed),
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
            TodoStatus.Pending,
        );
        this.todos.push(newTodo);
        return newTodo;
    }


    getTodoById(id: string): ToDoModel {
        var result = this.todos.find(todo =>(id) === todo.id);
        if(result == null){
            throw new NotFoundException("Todo Not found with id " + id )
        }
        return result;
    }

    deleteTodoById(id: string): ToDoModel {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            return this.todos.splice(index, 1)[0];
        }else{
            throw new NotFoundException("Todo Not found with id " + id )
        }
    }


    updateTodoById(id: string,  todoData: UpdateTodoDto): ToDoModel {
        const index = this.todos.findIndex(todo => todo.id == id);
        if (index !== -1) {
            const updatedTodo = { ...this.todos[index], ...todoData };
            this.todos[index] = updatedTodo;
            return updatedTodo;
        }else{
            throw new NotFoundException("Todo Not found with id " + id )
        }
    }
}
