import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('HoursRecord')
export class HoursRecord extends BaseEntity {
  @PrimaryGeneratedColumn (
    {
        name: 'id',
    })
id: number;
@Column({
    name: 'day',
    type: 'date',
    nullable: false
})
date:Date;
@Column({
    name: 'start_time',
    type: 'time',
    nullable: false,
})
startTime: string;
@Column({
    name: 'end_time',
    type: 'time',
    nullable: false,
})
endTime: string;
@Column({
    name: 'total_hours',
    type: 'decimal',
    nullable: false
})
totalHours: number;
@Column({
    name: 'where_to_place',
    type: 'varchar',
    length: 255,
    nullable: false
})
whereToPlace: string;
}
