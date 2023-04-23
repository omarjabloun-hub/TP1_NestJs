import { TodoStatus } from '../../entity/ToDoStatus';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';

@Entity('todo')
export class ToDoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
  })
  name: string;
  @Column({
    type: 'varchar',
  })
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.Pending,
  })
  status: TodoStatus;

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
