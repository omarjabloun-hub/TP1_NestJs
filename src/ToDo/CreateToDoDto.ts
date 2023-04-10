import { Length, IsNotEmpty, MinLength } from 'class-validator';
import {
  TODO_DESCRIPTION_MIN_LENGTH,
  TODO_NAME_LENGTH,
  TODO_DESCRIPTION_REQUIRED,
  TODO_NAME_REQUIRED,
} from '../common/error-messages';

export class CreateToDoDto {
  @Length(3, 10, { message: TODO_NAME_LENGTH })
  @IsNotEmpty({ message: TODO_NAME_REQUIRED })
  name?: string;
  @MinLength(10, { message: TODO_DESCRIPTION_MIN_LENGTH })
  @IsNotEmpty({ message: TODO_DESCRIPTION_REQUIRED })
  description?: string;
}
