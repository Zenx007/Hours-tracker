import { Inject, Injectable, Res } from "@nestjs/common";
import { MODULE_PATH } from "@nestjs/common/constants";
import { catchError } from "rxjs";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";
import { ConstantsMessagesHoursRecord } from "src/Helpers/ConstantsMessages/ConstantsMessages";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { Task } from 'src/Helpers/CustomObjects/Task.Interface';
import { IsNull, Repository } from "typeorm";

@Injectable()
export class HoursRecordRepository extends IHoursRecordRepository{
    private readonly _hoursDbContext: Repository<HoursRecord>;

    constructor(
        @Inject('HOURS_RECORD_REPOSITORY')
        private readonly hoursDbContext: Repository<HoursRecord>,
    ) {
        super();
        this._hoursDbContext = this.hoursDbContext;
    }

    async InsertAsync(model: HoursRecord): Task<Result<HoursRecord>> {
        try {
            model.createdAt = new Date();
            model.updatedAt = new Date();
            model.disabledAt = null;

            const result = await this._hoursDbContext.save(model);
            
            return Result.Ok(result);
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorInsert);
        }
    }

    async UpdateAsync (model: HoursRecord): Task<Result<HoursRecord>> {
       try {
        const hours: HoursRecord = await this.FindByIdAsync(model.id);
        if(hours == null) 
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorFindById);

        hours.startTime = model.startTime;
        hours.endTime = model.endTime;
        hours.dailyResume = model.dailyResume;
        hours.date = model.date;
        hours.whereToPlace = model.whereToPlace;
        hours.updatedAt = new Date();

        const saved = await this._hoursDbContext.save(hours);

        return Result.Ok(saved);
       }
       catch(error) {
        return Result.Fail(ConstantsMessagesHoursRecord.ErrorUpdate);
       }
    }
    async DeleteAsync (id: number): Task<Result> {
        try {
            const hours: HoursRecord = await this.FindByIdAsync(id);

            hours.disabledAt = new Date();

            await this._hoursDbContext.save(hours);

            return Result.Ok();
        }
        catch(error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorDisable);
        }
    }

    async FindByIdAsync(id: number): Task<HoursRecord> {
        try {
            const hours: HoursRecord = await this._hoursDbContext.findOne({
                where: { disabledAt: IsNull(),
                    id: id,
                },
            });

            return hours;
        }
        catch(error) {
            return null;
        }
    }

    async FindAllAsync(): Task<List<HoursRecord>> {
        try {
            const list: List<HoursRecord> = await this._hoursDbContext.find({
                where: {
                    disabledAt: IsNull(),
                },
            });

            return list;
        }
        catch {
            return null;
        }
    }
}