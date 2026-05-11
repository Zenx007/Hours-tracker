import { Inject } from "@nestjs/common";
import { hoursRecordProvider } from "src/Core/Entities/HoursRecord/HoursRecord.provider";
import { userProvider } from "src/Core/Entities/User/User.provider";
import { DataSource, Repository } from "typeorm";

type Provider = {
    provide: string;
    useFactory: (datasource: DataSource) => Repository<any>;
    inject: string [];
};

const AddProviders: Provider [] = [];

AddProviders.push(...hoursRecordProvider);
AddProviders.push(...userProvider);

export default AddProviders;
