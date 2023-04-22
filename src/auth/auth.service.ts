import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService
    ) {}

    async login(user : CreateUserDto) {
        const userFound = await this.usersService.findOne(user) ;
        if(!userFound) {
            return null ;
        }
        const payload = {email : userFound.email, id : userFound.id} ;
        return {
            access_token : this.jwtService.sign(payload)
        }
    }


}
