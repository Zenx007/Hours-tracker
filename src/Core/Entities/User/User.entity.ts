import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntities } from '../BaseEntities/BaseEntities';
import { HoursRecord } from '../HoursRecord/HoursRecord.entity';

@Entity('User')
export class User extends BaseEntities {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  passwordHash: string | null;

  @OneToMany(() => HoursRecord, (hoursRecord) => hoursRecord.user)
  hoursRecords: HoursRecord[];
}
