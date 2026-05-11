import { Provider } from "@nestjs/common";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { IUserService } from "src/Core/ServicesInterfaces/IUserService.interface";
import { HoursRecordService } from "src/Infrastructure/Service/HoursRecordService.service";
import { UserService } from "src/Infrastructure/Service/UserService.service";

const ServicesStartup: Provider[] = [];

ServicesStartup.push({
  provide: IHoursRecordService,
  useClass: HoursRecordService,
});

ServicesStartup.push({
  provide: IUserService,
  useClass: UserService,
});

export const AllServicesInjects = ServicesStartup.map(
    (provider) => provider['useClass'],
);

export default ServicesStartup;
