import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { UserSaveVO, UserVO } from "src/Communication/ViewObjects/User/UserVO";
import { User } from "../Entities/User/User.entity";

export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper,
                User,
                UserVO,
                forMember(
                    (d) => d.id,
                    mapFrom((s) => s.id)
                ),
                forMember(
                    (d) => d.name,
                    mapFrom((s) => s.name)
                ),
                forMember(
                    (d) => d.email,
                    mapFrom((s) => s.email)
                ));

            createMap(mapper,
                UserVO,
                User,
                forMember(
                    (d) => d.id,
                    mapFrom((s) => s.id)
                ),
                forMember(
                    (d) => d.name,
                    mapFrom((s) => s.name)
                ),
                forMember(
                    (d) => d.email,
                    mapFrom((s) => s.email)
                ));

            createMap(mapper,
                UserSaveVO,
                User,
                forMember(
                    (d) => d.name,
                    mapFrom((s) => s.name)
                ),
                forMember(
                    (d) => d.email,
                    mapFrom((s) => s.email)
                ));
        }
    }
}
