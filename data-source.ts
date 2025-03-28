import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'khronoscloud',
  password: 'Khronos_2025',
  database: 'intl_knos_demo_db_dev',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  logging: ['query', 'error'],
});
