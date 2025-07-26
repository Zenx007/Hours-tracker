import { DataSource } from "typeorm";
import { CONFIGURATION } from "app.config";
import { EntitiesConfigurations } from "./entities";

export const Db_DataSource = new DataSource({
    type: 'postgres',
    host: CONFIGURATION.HOST,
    port: CONFIGURATION.PORT,
    username: CONFIGURATION.USERNAME,
    password: CONFIGURATION.PASSWORD,
    database: CONFIGURATION.DATABASE,
    entities: [
        ...EntitiesConfigurations
    ],
    migrations: ['dist/src/Infrastructure/Migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsTableName: '__nest_migrations',
});