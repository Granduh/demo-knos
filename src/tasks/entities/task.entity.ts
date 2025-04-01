import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subtask } from './subtasks.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed?: boolean = false;

  @OneToMany(() => Subtask, (subtask) => subtask.task, {
    cascade: true,
    eager: false,
  })
  subtasks: Subtask[];
}
