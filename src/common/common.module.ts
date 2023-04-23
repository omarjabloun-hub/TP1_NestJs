import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Module({
  providers: [
    {
      provide: 'UUID',
      useValue: uuidv4,
    },
  ],
  exports: ['UUID'],
})
export class CommonModule {}
