import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class UsersAndHoursRecordRelation1757364047988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "User",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isNullable: false
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

        await queryRunner.createIndex("User", new TableIndex({
            name: "PK_User",
            columnNames: ["id"],
            isUnique: true
        }));

        await queryRunner.createIndex("User", new TableIndex({
            name: "UQ_User_Email",
            columnNames: ["email"],
            isUnique: true
        }));

        await queryRunner.addColumn("HoursRecord", new TableColumn({
            name: "user_id",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("HoursRecord", new TableForeignKey({
            name: "FK_HoursRecord_User",
            columnNames: ["user_id"],
            referencedTableName: "User",
            referencedColumnNames: ["id"],
            onDelete: "RESTRICT",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("HoursRecord", "FK_HoursRecord_User");
        await queryRunner.dropColumn("HoursRecord", "user_id");
        await queryRunner.dropIndex("User", "UQ_User_Email");
        await queryRunner.dropIndex("User", "PK_User");
        await queryRunner.dropTable("User");
    }
}
