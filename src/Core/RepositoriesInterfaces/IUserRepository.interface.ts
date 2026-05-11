import { Module } from "@nestjs/common";
import { User } from "../Entities/User/User.entity";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";

@Module({})
export abstract class IUserRepository {
    abstract InsertAsync(model: User): Task<Result<User>>;
    abstract UpdateAsync(model: User): Task<Result<User>>;
    abstract FindByIdAsync(id: number): Task<User>;
    abstract FindByEmailAsync(email: string): Task<User>;
    abstract FindAllAsync(): Task<List<User>>;
}
