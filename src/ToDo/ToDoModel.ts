import { TodoStatus } from './ToDoStatus';

export class ToDoModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatus;

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    status: TodoStatus,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.status = status;
  }
}
