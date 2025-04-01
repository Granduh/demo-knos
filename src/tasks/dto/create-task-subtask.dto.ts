import { Type } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';
import { CreateSubtaskDto } from './create-subtask.dto';
import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class CreateTaskSubtaskDto {
  @ValidateNested()
  @Type(() => CreateTaskDto)
  @IsNotEmpty()
  task: CreateTaskDto;

  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe ingresar al menos una subtarea' })
  subtasks: CreateSubtaskDto[];
}
