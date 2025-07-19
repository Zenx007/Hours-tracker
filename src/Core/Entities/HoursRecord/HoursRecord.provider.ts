import { DataSource } from "typeorm";
import { HoursRecord } from "./HoursRecord.entity";

export const hoursRecordProvider = [
    {
  provide: 'HOURS_RECORD_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(HoursRecord),
  inject: ['DATA_SOURCE'],
},
]