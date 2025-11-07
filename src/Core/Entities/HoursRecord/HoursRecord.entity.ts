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
  transformer: {
   to: (value: any) => {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) {
      return value.toISOString().split('T')[0];
    }

    if (typeof value === 'string' && value.includes('T')) {
      return value.split('T')[0];
    }

    if (typeof value === 'string') {
      return value;
    }

    return null;
  },

  from: (value: string) => {
    if (!value) return null;
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  },
},
})
date: Date;

@Column({
    name: 'start_time',
    type: 'time',
    nullable: false,
    transformer: {
   to: (value: any) => {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) {
      return value.toTimeString().split(' ')[0]; 
    }

    if (typeof value === 'string' && value.includes('T')) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toTimeString().split(' ')[0];
      }
    }

    if (typeof value === 'string') {
      const normalized = value.length === 5 ? `${value}:00` : value;
      const date = new Date(`1970-01-01T${normalized}`);
      if (!isNaN(date.getTime())) {
        return date.toTimeString().split(' ')[0];
      }
    }

    return null;
  },

  from: (value: string) => {
    if (!value) return null;

    const [hours, minutes, seconds] = value.split(':').map(Number);
    if (
      [hours, minutes].some(isNaN) ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
    ) {
      return null;
    }

    const date = new Date();
    date.setHours(hours, minutes, seconds || 0, 0);
    return date;
  },
},
})
startTime: Date;
@Column({
    name: 'end_time',
    type: 'time',
    nullable: true,
    transformer: {
   to: (value: any) => {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) {
      return value.toTimeString().split(' ')[0]; 
    }

    if (typeof value === 'string' && value.includes('T')) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toTimeString().split(' ')[0];
      }
    }

    if (typeof value === 'string') {
      const normalized = value.length === 5 ? `${value}:00` : value;
      const date = new Date(`1970-01-01T${normalized}`);
      if (!isNaN(date.getTime())) {
        return date.toTimeString().split(' ')[0];
      }
    }

    return null;
  },

  from: (value: string) => {
    if (!value) return null;

    const [hours, minutes, seconds] = value.split(':').map(Number);
    if (
      [hours, minutes].some(isNaN) ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
    ) {
      return null;
    }

    const date = new Date();
    date.setHours(hours, minutes, seconds || 0, 0);
    return date;
  },
},
})
endTime: Date;

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
