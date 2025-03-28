import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../../../tasks/entities/task.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty({
    message: 'El nombre de la tarea secundaria no puede estar vacío.',
  })
  @IsString({ message: 'El nombre de la tarea secundaria debe ser un texto.' })
  description: string;

  @Column({ default: false })
  @IsBoolean({
    message: 'El estado de la tarea secundaria debe ser true o false.',
  })
  completed: boolean;

  @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
