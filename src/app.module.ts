import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtasksModule } from './tasks/subtasks/subtasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'khronoscloud',
      password: 'Khronos_2025',
      database: 'intl_knos_demo_db_dev',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
      logging: true,
    }),
    TasksModule,
    SubtasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
