import { ApiProperty } from "@nestjs/swagger";
import { NameColumn } from "src/Helpers/CustomDecorators/ListFrontVO.decorator";

export class HoursRecordVO {
    @ApiProperty()
    @NameColumn("Data")
    date: Date;

    @ApiProperty()
    @NameColumn("Hora de início")
    startTime: Date;

    @ApiProperty()
    @NameColumn("Hora de termíno")
    entTime: Date;

    @ApiProperty()
    @NameColumn("Total de horas trabalhadas")
    totalHours: Date;

    @ApiProperty()
    @NameColumn("Onde lançar")
    whereToPlace: string;

    @ApiProperty()
    @NameColumn("Resumo para a daily")
    dailyResum: string;
}