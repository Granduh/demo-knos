import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findAll(): Promise<Task[]> {
    return this.find();
  }

  async findOneById(id: number): Promise<Task | null> {
    return this.findOne({ where: { id } });
  }

  async createTask(
    queryRunner: QueryRunner, // Permite que el método acepte y maneje transacciones con queryRunner
    body: CreateTaskDto,
  ): Promise<Task> {
    const newTask = this.create(body); //Se crea una instancia de la entidad
    return queryRunner.manager.save(newTask); //queryRunner.manager.save guarda la entidad en la base de datos
  }

  async updateTask(
    queryRunner: QueryRunner,
    id: number,
    taskData: Partial<CreateTaskDto>,
  ): Promise<Task> {
    await queryRunner.manager.update(Task, id, taskData); //Se actualiza la entidad pero no la devuelve
    const task = await queryRunner.manager.findOne(Task, { where: { id } }); //Se busca la entidad actualizada
    if (!task) {
      throw new NotFoundException(`La tarea con el ID ${id} no fue encontrada`);
    }
    return task; // Se devuelve la entidad actualizada
  }

  async deleteTask(queryRunner: QueryRunner, id: number): Promise<string> {
    const result = await queryRunner.manager.delete(Task, id); //Se elimina la entidad y devuelve un resultado

    if ((result.affected ?? 0) > 0) {
      //Se verifica si se eliminó alguna entidad
      return 'La tarea se eliminó exitosamente';
    } else {
      //Si no se eliminó ninguna entidad significa que la tarea no existía
      throw new NotFoundException('Tarea no encontrada');
    }
  }

  // Desde aqui se agregan los métodos para manejar subtareas
  async findByIdWithSubtasks(id: number): Promise<Task | null> {
    return this.findOne({
      where: { id },
      relations: ['subtasks'],
    });
  }
}
