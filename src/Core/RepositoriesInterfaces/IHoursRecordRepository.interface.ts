import { Task } from "src/Helpers/CustomObjects/Task.Interface";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { Result } from "src/Helpers/CustomObjects/Result";

export abstract class IHoursRecordRepository {
    abstract Insert (model: HoursRecord): Task<number>;
    abstract Update (model: HoursRecord): Task<number>;
    abstract Delete (id: number): Task<Result>
    abstract GetById (id: number): Task<HoursRecord>;
    abstract GetAll (): Task<HoursRecord[]>;
}