
import {createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile } from "@automapper/nestjs/src/lib/automapper-profile";
import { InjectMapper } from "@automapper/nestjs/src/lib/di/inject-mapper";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";

export class HoursRecordProfile extends AutomapperProfile {
      constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper,
                HoursRecord, 
                HoursRecordVO,
                forMember(
                    (d) => d.startTime,
                    mapFrom((s) => s.startTime)
                ),
                forMember(
                    (d) => d.date,
                    mapFrom((d) => d.date)
                ),
                forMember(
                    (d) => d.dailyResum,
                    mapFrom((d) => d.dailyResume)
                ),
                forMember(
                    (d) => d.entTime,
                    mapFrom((d) => d.endTime)
                ),
                forMember(
                    (d) => d.totalHours,
                    mapFrom((d) => d.totalHours)
                ),
                forMember(
                    (d) => d.whereToPlace,
                    mapFrom((d) => d.whereToPlace)
                ))
        }
    }
}