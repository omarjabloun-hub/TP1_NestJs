import {ToDo} from "./entity/ToDo";
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todo_nest',
    entities: [ToDo],
    synchronize: true,
    migrations: [/*...*/],
})