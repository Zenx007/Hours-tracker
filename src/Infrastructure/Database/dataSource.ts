import { DataSource } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { EntitiesConfigurations } from "./entities";

dotenvConfig({ path: ".env" });

const toNumber = (value: string | undefined, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const databaseUrl = process.env.DATABASE_URL;
const ssl = process.env.DB_SSL === "true" || databaseUrl?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined;

export const Db_DataSource = new DataSource({
    type: 'postgres',
    ...(databaseUrl
        ? { url: databaseUrl }
        : {
            host: process.env.DB_HOST ?? process.env.PGHOST ?? process.env.POSTGRES_HOST ?? "localhost",
            port: toNumber(process.env.DB_PORT ?? process.env.PGPORT ?? process.env.POSTGRES_PORT, 5432),
            username: process.env.DB_USERNAME ?? process.env.PGUSER ?? process.env.POSTGRES_USER ?? "postgres",
            password: process.env.DB_PASSWORD ?? process.env.PGPASSWORD ?? process.env.POSTGRES_PASSWORD ?? "postgres123",
            database: process.env.DB_DATABASE ?? process.env.PGDATABASE ?? process.env.POSTGRES_DB ?? "postgres",
        }),
    ssl,
    entities: [
        ...EntitiesConfigurations
    ],
    migrations: ['dist/src/Infrastructure/Migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsTableName: '__nest_migrations',
});
