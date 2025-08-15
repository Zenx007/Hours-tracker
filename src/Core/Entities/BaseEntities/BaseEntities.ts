import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
export class BaseEntities {
    @CreateDateColumn({name:"created_at", nullable: false})
    createdAt: Date;
    
    @UpdateDateColumn({name:"updated_at", nullable: false})
    updatedAt: Date;

    @Column({nullable:true, name:"disabled_at", type: "timestamp"})
    disabledAt?: Date | null;

    Disable(){
        this.disabledAt = new Date();
    }
}