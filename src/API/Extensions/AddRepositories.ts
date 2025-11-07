import { Provider } from "@nestjs/common";
import { HoursRecord } from "src/Core/Entities/HoursRecord/HoursRecord.entity";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";
import { HoursRecordRepository } from "src/Infrastructure/Repositories/HoursRecordRepository.service";

const RepositoriesStartup: Provider[] = [];

RepositoriesStartup.push({
    provide: IHoursRecordRepository,
    useClass: HoursRecordRepository,
});

export default RepositoriesStartup;