
import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import {BaseEntity} from "../common/BaseEntity";

@Entity('user')
export class UserModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['email'])
    @Column()
    email: string;

    @Column()
    password: string;
}
