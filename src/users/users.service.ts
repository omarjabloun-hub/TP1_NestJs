import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserModel) private readonly userRepo : Repository<UserModel>){}

    async find(id : number) {
        return await this.userRepo.findOne({where : {id}}) ;
    }

    async findOne(body : CreateUserDto) {
        return await this.userRepo.findOne({where : body}) ;
    }

    async create(body : CreateUserDto) : Promise<UserModel> {
        const user = this.userRepo.create( {
            ...body,
        }) ;
        await this.userRepo.save(user) ;
        return user ;
    }
}
