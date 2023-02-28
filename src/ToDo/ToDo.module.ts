import { Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';

@Module({
  controllers: [ToDoController]
})
export class ToDoModule {}
