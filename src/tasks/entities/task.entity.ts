import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subtask } from '../subtasks/entities/subtasks.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty({ message: 'El nombre de la tarea no puede estar vacío.' })
  @IsString({ message: 'El nombre de la tarea debe ser un texto.' })
  name: string;

  @Column({ default: false })
  @IsBoolean({ message: 'El estado de la tarea debe ser true o false.' })
  completed?: boolean;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];
}
