import {TodoStatus} from "./ToDoStatus";

export class UpdateTodoDto {
    name ?: string;
    description ?: string;
    status ?: TodoStatus;
}