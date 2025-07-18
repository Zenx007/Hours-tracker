import { CreateDateColumn} from "typeorm";
export class BaseEntities {
    @CreateDateColumn({name:"created_at", nullable: false})
    createdAt: Date;
    
    @CreateDateColumn({name:"updated_at", nullable: false})
    updatedAt: Date;

    @CreateDateColumn({nullable:true,name:"disabled_at"})
    disabledAt?: Date;

    Disable(){
        this.disabledAt = new Date();
    }
}