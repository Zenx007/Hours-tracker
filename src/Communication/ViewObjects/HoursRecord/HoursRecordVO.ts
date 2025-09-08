import { ApiProperty } from "@nestjs/swagger";
import { NameColumn } from "src/Helpers/CustomDecorators/ListFrontVO.decorator";

export class HoursRecordVO {
    @ApiProperty()
    @NameColumn("Id")
    id: number;
    
    @ApiProperty()
    @NameColumn("Data")
    date: Date;

    @ApiProperty()
    @NameColumn("Hora de início")
    startTime: Date;

    @ApiProperty()
    @NameColumn("Hora de termíno")
    endTime: Date;

    @ApiProperty()
    @NameColumn("Total de horas trabalhadas")
    totalHours: string;

    @ApiProperty()
    @NameColumn("Onde lançar")
    whereToPlace: string;

    @ApiProperty()
    @NameColumn("Resumo para a daily")
    dailyResume: string;
}