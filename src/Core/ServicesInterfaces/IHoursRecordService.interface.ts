import { Module } from "@nestjs/common";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { List } from "src/Helpers/CustomObjects/List.Interface";

@Module({})
export abstract class IHoursRecordService {
    abstract CreateAsync (model: HoursRecord): Task<Result<HoursRecord>>;
    abstract UpdateAsync (model: HoursRecord): Task<Result<HoursRecord>>;
    abstract DeleteAsync(id: number): Task<Result>;
    abstract GetById (id: number): Task<Result<HoursRecord>>;
    abstract GetAll (): Task<List<HoursRecord>>;

}