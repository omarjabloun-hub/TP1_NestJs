import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      TypeOrmModule.forFeature([UserModel])
  ],
  exports: [UsersService]
})
export class UsersModule {}
