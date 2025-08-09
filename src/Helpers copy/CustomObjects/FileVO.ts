import { ApiProperty } from "@nestjs/swagger";

export class FileVO {
    @ApiProperty()
    file:string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    disabled?:boolean;

    constructor(file?:string, name?:string, disabled?:boolean){
        this.file = file ?? ""; 
        this.name = name ?? "";
        this.disabled = disabled;
    }
}