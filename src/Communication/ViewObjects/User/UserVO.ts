import { ApiProperty } from "@nestjs/swagger";
import { NameColumn } from "src/Helpers/CustomDecorators/ListFrontVO.decorator";

export class UserVO {
    @ApiProperty()
    @NameColumn("Id")
    id: number;

    @ApiProperty()
    @NameColumn("Nome")
    name: string;

    @ApiProperty()
    @NameColumn("E-mail")
    email: string;
}

export class UserSaveVO {
    @ApiProperty()
    @NameColumn("Nome")
    name: string;

    @ApiProperty()
    @NameColumn("E-mail")
    email: string;
}

export class UserLoginVO {
    @ApiProperty()
    @NameColumn("E-mail")
    email: string;
}
