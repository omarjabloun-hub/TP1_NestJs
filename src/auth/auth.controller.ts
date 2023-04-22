import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}
    @Post('register')
    async register(@Body() body : CreateUserDto) {
        const user = await this.usersService.create(body) ;
        return user ;
    }
    @Post('login')
    async login(@Body() body : CreateUserDto) {
        const user = await this.authService.login(body) ;
        if(!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        }
        return user ;
    }
}
