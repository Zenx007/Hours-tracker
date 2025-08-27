import { Module } from "@nestjs/common";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";

@Module({})
export abstract class IHoursRecordService {
    abstract CreateAsync (model: HoursRecordVO): Task<Result<HoursRecordVO>>;
    abstract UpdateAsync (model: HoursRecordVO): Task<Result<HoursRecordVO>>;
    abstract DeleteAsync(id: number): Task<Result>;
    abstract GetById (id: number): Task<Result<HoursRecordVO>>;
    abstract GetAll (): Task<Result<List<HoursRecordVO>>>;

}