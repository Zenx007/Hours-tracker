import { Module } from "@nestjs/common";
import { UserLoginVO, UserSaveVO, UserVO } from "src/Communication/ViewObjects/User/UserVO";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";

@Module({})
export abstract class IUserService {
    abstract CreateAsync(model: UserSaveVO): Task<Result<UserVO>>;
    abstract UpdateAsync(model: UserVO): Task<Result<UserVO>>;
    abstract LoginAsync(model: UserLoginVO): Task<Result<UserVO>>;
    abstract GetById(id: number): Task<Result<UserVO>>;
    abstract GetAll(): Task<Result<List<UserVO>>>;
}
