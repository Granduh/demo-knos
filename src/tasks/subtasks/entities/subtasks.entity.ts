import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../../../tasks/entities/task.entity';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
