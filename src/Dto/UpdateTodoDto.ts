import { TodoStatus } from '../entity/ToDoStatus';
import {
  TODO_DESCRIPTION_MIN_LENGTH,
  TODO_NAME_LENGTH,
  TODO_STATUS_INVALID,
} from '../common/error-messages';
import { IsEnum, IsOptional, Length, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @Length(3, 10, { message: TODO_NAME_LENGTH })
  name?: string;
  @IsOptional()
  @MinLength(10, { message: TODO_DESCRIPTION_MIN_LENGTH })
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus, { message: TODO_STATUS_INVALID })
  status?: TodoStatus;
}
