import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { ToDoModule } from './ToDo/ToDo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entity/ToDo';

@Module({
  imports: [
    PremierModule,
    ToDoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo_nest',
      entities: [ToDo],
      synchronize: true,
      migrations: [/*...*/],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
