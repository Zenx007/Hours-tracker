import { Mapper } from "@automapper/core";
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

    constructor (
        private readonly hoursRepo: IHoursRecordRepository,
        private readonly mapper: Mapper,

    ) {
        super();
        this._hoursRepo = this.hoursRepo;
        this._mapper = this.mapper;
    }

    async CreateAsync(model: HoursRecordVO): Task<Result<HoursRecordVO>> {
        try {
            const hours = this._mapper.map(model, HoursRecordVO, HoursRecord);

            const saved = await this._hoursRepo.InsertAsync(hours);
            if(saved.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorCreate);

            const response = this._mapper.map(saved.value, HoursRecord, HoursRecordVO);
            
            return Result.Ok(response);
        }
        catch (error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorCreate)
        }
    }
    async UpdateAsync(model: HoursRecordVO): Task<Result<HoursRecordVO>> {
        try {
            if(model.id < 0 || model.id == null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorNotFound)

            const hoursUpdate = this._mapper.map(model, HoursRecordVO, HoursRecord);

            const update = await this._hoursRepo.UpdateAsync(hoursUpdate);
            if(update.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorPut);

            const response = this._mapper.map(update.value, HoursRecord, HoursRecordVO)

            return Result.Ok(response)
        }
        catch(error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorPut)
        }
    }
    async DeleteAsync(id: number): Task<Result> {
        try {
            const hoursDelete = await this._hoursRepo.FindByIdAsync(id);
            if(hoursDelete ==null)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorNotFound);

            const response = await this._hoursRepo.DeleteAsync(id);
            if(response.isFailed)
                return Result.Fail(ConstantsMessagesHoursRecord.ErrorDelete)

            return Result.Ok();
        }
        catch(error) {
            return Result.Fail(ConstantsMessagesHoursRecord.ErrorDelete)
        }
    }
    GetById(id: number): Task<Result<HoursRecordVO>> {
        throw new Error("Method not implemented.");
    }
    GetAll(): Task<List<HoursRecordVO>> {
        throw new Error("Method not implemented.");
    }

}