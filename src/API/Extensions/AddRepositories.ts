import { Provider } from "@nestjs/common";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";

const RepositoriesStartup: Provider[] = [];

RepositoriesStartup.push({
    provide: IHoursRecordRepository,
    useClass: HoursRecord,
});

export default RepositoriesStartup;