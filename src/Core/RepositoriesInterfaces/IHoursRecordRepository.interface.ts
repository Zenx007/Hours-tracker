import { Task } from "src/Helpers/CustomObjects/Task.Interface";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { Result } from "src/Helpers/CustomObjects/Result";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Module } from "@nestjs/common";

@Module({})
export abstract class IHoursRecordRepository {
    abstract InsertAsync (model: HoursRecord): Task<Result<number>>;
    abstract UpdateAsync (model: HoursRecord): Task<Result<number>>;
    abstract DeleteAsync (id: number): Task<Result>;
    abstract FindByIdAsync (id: number): Task<HoursRecord>;
    abstract FindAllAsync (): Task<List<HoursRecord>>;
}