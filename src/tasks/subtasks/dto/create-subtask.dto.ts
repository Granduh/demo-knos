import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
export class CreateSubtaskDto {
  @IsNotEmpty({
    message: 'El nombre de la tarea secundaria no puede estar vacío.',
  })
  @IsString({ message: 'El nombre de la tarea secundaria debe ser un texto.' })
  name: string;

  @IsBoolean({
    message: 'El estado de la tarea secundaria debe ser true o false.',
  })
  @IsOptional()
  completed?: boolean;

  @IsNumber(
    {},
    {
      message: 'El id de la tarea principal debe ser un número válido.',
    },
  )
  @IsNotEmpty({
    message: 'El id de la tarea principal no puede estar vacío.',
  })
  taskId: number;
}
