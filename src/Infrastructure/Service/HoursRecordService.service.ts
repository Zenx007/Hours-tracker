import { Injectable } from "@nestjs/common";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { ConstantsMessagesHoursRecord } from "src/Helpers/ConstantsMessages/ConstantsMessages";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";

@Injectable()
export class HoursRecordService extends IHoursRecordService {
    private readonly _hoursRepo: IHoursRecordService;

    constructor (
        private readonly hoursRepo: IHoursRecordService,

    ) {
        super();
        this._hoursRepo = this.hoursRepo;
    }

    async CreateAsync(model: HoursRecord): Task<Result<HoursRecord>> {
        try {
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorCreate)
        }
    }
    UpdateAsync(model: HoursRecord): Task<Result<HoursRecord>> {
        throw new Error("Method not implemented.");
    }
    DeleteAsync(id: number): Task<Result> {
        throw new Error("Method not implemented.");
    }
    GetById(id: number): Task<Result<HoursRecord>> {
        throw new Error("Method not implemented.");
    }
    GetAll(): Task<List<HoursRecord>> {
        throw new Error("Method not implemented.");
    }

}