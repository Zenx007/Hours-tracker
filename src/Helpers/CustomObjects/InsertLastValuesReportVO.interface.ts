import { ApiProperty } from "@nestjs/swagger";

export class InsertLastValuesReportVO
{
    Column:number
    Value:any;
}

export enum ExportEnumVO{
    Pdf = 1,
    Xlsx = 2,
}