import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class HoursRecordMigration1757364047987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "HoursRecord",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "day",
                    type: "date",
                    isNullable: false
                },
                {
                    name: "start_time",
                    type: "time",
                    isNullable: false
                },
                {
                    name: "end_time",
                    type: "time",
                    isNullable: true
                },
                {
                    name: "where_to_place",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "daily_resume",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "disabled_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createIndex("HoursRecord", new TableIndex({
            name: "PK_HoursRecord",
            columnNames: ["id"],
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("HoursRecord", "PK_HoursRecord");
        await queryRunner.dropTable("HoursRecord");
    }
}