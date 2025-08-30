import { Response, Request } from 'express';
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { ConstantsMessagesHoursRecord } from "src/Helpers/ConstantsMessages/ConstantsMessages";
import { StatusCode, StatusCodes } from "src/Helpers/StatusCode/StatusCode";
import { Controller, Get, Req, Res } from '@nestjs/common';
import { List } from 'src/Helpers/CustomObjects/List.Interface';
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ApiResponse } from "src/Helpers/CustomObjects/ApiResponse.interface";

@Controller('HoursRecord')
export class HoursRecordController {
  constructor(
    private readonly _hoursService: IHoursRecordService,

  ) { }

  @ApiOperation({ summary: 'Getall - Lista todos os registros de hora' })
  @Get('GetAll')
  async GetAllAsync(
    @Res() res: Response,
    @Req() req: Request) {
    const response = new ApiResponse<List<HoursRecordVO>>();
    try {
 
      const list = await this._hoursService.GetAll();
      if (list.isFailed) {
        response.success = false;
        response.message = list.errors.toString();
        return StatusCode(res, StatusCodes.STATUS_404_NOT_FOUND, response);
      }

      response.success = true;
      response.object = list.value;

      return StatusCode(res, StatusCodes.STATUS_200_OK, response);

    }
    catch (error) {
   
      response.success = false;
      response.message = ConstantsMessagesHoursRecord.ErrorGetAll;
      return StatusCode(
        res,
        StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR,
        response,)
    }
}
}

