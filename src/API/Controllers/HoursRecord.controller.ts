import { Response, Request } from 'express';
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { ConstantsMessagesHoursRecord } from "src/Helpers/ConstantsMessages/ConstantsMessages";
import { StatusCode, StatusCodes } from "src/Helpers/StatusCode/StatusCode";
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { List } from 'src/Helpers/CustomObjects/List.Interface';
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ApiResponse } from "src/Helpers/CustomObjects/ApiResponse.interface";
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';
import { Stats } from 'fs';

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
        response);
    }
}

@ApiOperation({summary: 'Create - Cria um novo registro de horas'})
@Post('Create')
async CreateAsync (
  @Res() res : Response,
  @Req() req : Request,
  @Body() model : HoursRecordVO,
)
{
  const response = new ApiResponse<HoursRecordVO>();
  try {
    const result = await this._hoursService.CreateAsync(model);
    if(result.isFailed) 
      {
      response.object = null,
      response.message = ConstantsMessagesHoursRecord.ErrorCreate,
      response.success = false;

      return StatusCode(res, StatusCodes.STATUS_400_BAD_REQUEST, response);
    }

    response.object = result.value,
    response.success = true;

    return StatusCode(res, StatusCodes.STATUS_201_CREATED, response);
  }
  catch(error) {

    response.object = null,
    response.message = ConstantsMessagesHoursRecord.ErrorCreate,
    response.success = false;

    return StatusCode(res, StatusCodes.STATUS_500_INTERNAL_SERVER_ERROR, response);
  }
}
}

