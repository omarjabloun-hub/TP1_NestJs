import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { ToDoModule } from './ToDo/ToDo.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PremierModule, ToDoModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
