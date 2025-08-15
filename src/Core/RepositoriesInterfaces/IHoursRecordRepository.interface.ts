import { Task } from "src/Helpers/CustomObjects/Task.Interface";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { Result } from "src/Helpers/CustomObjects/Result";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Module } from "@nestjs/common";

@Module({})
export abstract class IHoursRecordRepository {
    abstract Insert (model: HoursRecord): Task<Result<number>>;
    abstract Update (model: HoursRecord): Task<Result<number>>;
    abstract Delete (id: number): Task<Result>;
    abstract GetById (id: number): Task<HoursRecord>;
    abstract GetAll (): Task<List<HoursRecord>>;
}