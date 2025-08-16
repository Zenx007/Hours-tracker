import { Inject, Injectable, Res } from "@nestjs/common";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";
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

    async Insert(model: HoursRecord): Task<Result<number>> {
        try {
            model.createdAt = new Date();
            model.updatedAt = new Date();
            model.disabledAt = null;

            const result = await this._hoursDbContext.save(model);
            
            return Result.Ok(result.id);
        }
        catch (error) {
            return Result.Fail("Error");
        }
    }

    async Update(model: HoursRecord): Task<Result<number>> {
       throw new Error("Method not implemented.");
    }
    async Delete(id: number): Task<Result> {
        throw new Error("Method not implemented.");
    }

    async GetById(id: number): Task<HoursRecord> {
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

    async GetAll(): Task<List<HoursRecord>> {
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