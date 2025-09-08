import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { HoursRecord } from "../Entities/HoursRecord/HoursRecord.entity";
import { HoursRecordVO } from "src/Communication/ViewObjects/HoursRecord/HoursRecordVO";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

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
                    (d) => d.id,
                    mapFrom((s) => s.id)
                ),
                forMember(
                    (d) => d.startTime,
                    mapFrom((s) => s.startTime)
                ),
                forMember(
                    (d) => d.date,
                    mapFrom((s) => s.date)
                ),
                forMember(
                    (d) => d.dailyResume,
                    mapFrom((s) => s.dailyResume)
                ),
                forMember(
                    (d) => d.endTime,
                    mapFrom((s) => s.endTime)
                ),
                forMember(
                    (d) => d.whereToPlace,
                    mapFrom((s) => s.whereToPlace)
                ))

            createMap(mapper,
                HoursRecordVO, 
                HoursRecord,
                forMember(
                    (d) => d.id,
                    mapFrom((s) => s.id)
                ),
                forMember(
                    (d) => d.startTime,
                    mapFrom((s) => s.startTime)
                ),
                forMember(
                    (d) => d.date,
                    mapFrom((s) => s.date)
                ),
                forMember(
                    (d) => d.dailyResume,
                    mapFrom((s) => s.dailyResume)
                ),
                forMember(
                    (d) => d.endTime,
                    mapFrom((s) => s.endTime)
                ),
                forMember(
                    (d) => d.whereToPlace,
                    mapFrom((s) => s.whereToPlace)
                ))
        }
    }
    
}