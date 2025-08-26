import { Provider } from "@nestjs/common";
import { IHoursRecordService } from "src/Core/ServicesInterfaces/IHoursRecordService.interface";
import { HoursRecordService } from "src/Infrastructure/Service/HoursRecordService.service";

const ServicesStartup: Provider[] = [];

ServicesStartup.push({
  provide: IHoursRecordService,
  useClass: HoursRecordService,
});

export const AllServicesInjects = ServicesStartup.map(
    (provider) => provider['useClass'],
);

export default ServicesStartup;