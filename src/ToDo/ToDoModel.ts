enum TodoStatus {
    Pending = 'En attente',
    InProgress = 'En cours',
    Completed = 'Finalisé',
}

export class ToDoModel {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    status: TodoStatus;

    constructor(id: number, name: string, description: string, createdAt: Date, status: TodoStatus) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.status = status;
    }
}
