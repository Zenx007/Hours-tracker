import { Provider } from "@nestjs/common";
import { IHoursRecordRepository } from "src/Core/RepositoriesInterfaces/IHoursRecordRepository.interface";
import { IUserRepository } from "src/Core/RepositoriesInterfaces/IUserRepository.interface";
import { HoursRecordRepository } from "src/Infrastructure/Repositories/HoursRecordRepository.service";
import { UserRepository } from "src/Infrastructure/Repositories/UserRepository.service";

const RepositoriesStartup: Provider[] = [];

RepositoriesStartup.push({
    provide: IHoursRecordRepository,
    useClass: HoursRecordRepository,
});

RepositoriesStartup.push({
    provide: IUserRepository,
    useClass: UserRepository,
});

export default RepositoriesStartup;
