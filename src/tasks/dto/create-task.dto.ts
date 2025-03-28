import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El nombre de la tarea no puede estar vacío.' })
  @IsString({ message: 'El nombre de la tarea debe ser un texto.' })
  name: string;

  @IsBoolean({ message: 'El estado de la tarea debe ser true o false.' })
  @IsOptional()
  completed?: boolean;
}
