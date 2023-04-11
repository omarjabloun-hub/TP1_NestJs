import { TodoStatus } from './ToDoStatus';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';

@Entity()
export class ToDo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  status: TodoStatus;
  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  deletedAt: Date;
  @DeleteDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    status: TodoStatus,
  ) {
    super(createdAt, updatedAt, deletedAt);
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }

}
