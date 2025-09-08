import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable, Res } from "@nestjs/common";
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { ConstantsMessagesHoursRecord } from "src/Helpers/ConstantsMessages/ConstantsMessages";
import { List } from "src/Helpers/CustomObjects/List.Interface";
import { Result } from "src/Helpers/CustomObjects/Result";
import { Task } from "src/Helpers/CustomObjects/Task.Interface";

@Injectable()
export class HoursRecordService extends IHoursRecordService {
    private readonly _hoursRepo: IHoursRecordRepository;
    private readonly _mapper: Mapper;
    
    constructor(
        private readonly hoursRepo: IHoursRecordRepository,
        @InjectMapper()
        private readonly mapper: Mapper,

    ) {
        super();
        this._mapper = this.mapper;
        this._hoursRepo = this.hoursRepo;
    }

    async CreateAsync(model: HoursRecordVO): Task<Result<HoursRecordVO>> {
        try {
            const hours = this._mapper.map(model, HoursRecordVO, HoursRecord);

            const saved = await this._hoursRepo.InsertAsync(hours);
            if (saved.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorCreate);

            const response = this._mapper.map(saved.value, HoursRecord, HoursRecordVO);

            return Result.Ok(response);
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorCreate);
        }
    }
    async UpdateAsync(model: HoursRecordVO): Task<Result<HoursRecordVO>> {
        try {
            if (model.id < 0 || model.id == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorNotFound);

            const hoursUpdate = this._mapper.map(model, HoursRecordVO, HoursRecord);

            const update = await this._hoursRepo.UpdateAsync(hoursUpdate);
            if (update.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorPut);

            const response = this._mapper.map(update.value, HoursRecord, HoursRecordVO)

            return Result.Ok(response)
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorPut)
        }
    }
    async DeleteAsync(id: number): Task<Result> {
        try {
            const hoursDelete = await this._hoursRepo.FindByIdAsync(id);
            if (hoursDelete == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorNotFound);

            const response = await this._hoursRepo.DeleteAsync(id);
            if (response.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorDelete)

            return Result.Ok();
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorDelete)
        }
    }
    async GetById(id: number): Task<Result<HoursRecordVO>> {
        try {
            if(id < 0 || id == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorNotFound);
                
            const hours = await this._hoursRepo.FindByIdAsync(id);
            if(hours == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorPrepare)

            const response = this._mapper.map(hours, HoursRecord, HoursRecordVO);

            return Result.Ok(response)
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorPrepare)
        }
    }
    async GetAll(): Task<Result<List<HoursRecordVO>>> {
        try {
            const list: List<HoursRecord> = await this._hoursRepo.FindAllAsync();
            if(list == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorGetAll)

            const response = this._mapper.mapArray(list, HoursRecord, HoursRecordVO);

            return Result.Ok(response);
        }
        catch(error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorGetAll)
        }
    }

}