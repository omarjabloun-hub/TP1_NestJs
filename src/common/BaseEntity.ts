import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
  constructor(createdAt: Date, updatedAt: Date, deletedAt: Date) {
    this.deletedAt = deletedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
