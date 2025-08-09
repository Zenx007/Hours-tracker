import { Task } from "src/Helpers copy/CustomObjects/Task.Interface";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";

export abstract class IHoursRecordRepository {
    abstract Insert (model: HoursRecord) : Task<number>;
}