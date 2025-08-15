import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntities } from "../BaseEntities/BaseEntities";

@Entity('HoursRecord')
export class HoursRecord extends BaseEntities {
@PrimaryGeneratedColumn ({
    name: 'id',
})
id: number;
@Column({
    name: 'day',
    type: 'date',
    nullable: false,
})
date:Date;
@Column({
    name: 'start_time',
    type: 'time',
    nullable: false,
})
startTime: Date;
@Column({
    name: 'end_time',
    type: 'time',
    nullable: true,
})
endTime: Date;
@Column({
    name: 'total_hours',
    type: 'decimal',
    nullable: true,
})
totalHours: Date;
@Column({
    name: 'where_to_place',
    type: 'varchar',
    length: 255,
    nullable: true,
})
whereToPlace: string;
@Column({
    name: 'daily_resume',
    type: 'varchar',
    length: 255,
    nullable: true,
})
dailyResume: string;
}
