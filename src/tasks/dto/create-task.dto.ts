import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
