import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { ToDoModule } from './ToDo/ToDo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './ToDo/entities/ToDoEntity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModel } from './users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './authentication-middleware';

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
      database: 'nest_db',
      entities: [ToDoEntity, UserModel],
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'dasdsaadsdsaadsdsadsa',
      signOptions: { expiresIn: '3600s' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes('v1/todo');
  }
}
