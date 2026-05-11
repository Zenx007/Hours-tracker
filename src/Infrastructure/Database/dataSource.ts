import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { EntitiesConfigurations } from './entities';
import { join } from 'path';

dotenvConfig({ path: '.env' });

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const databaseUrl = process.env.DATABASE_URL;
const ssl =
  process.env.DB_SSL === 'true' || databaseUrl?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined;

const hasDatabaseHost = Boolean(
  process.env.DB_HOST ?? process.env.PGHOST ?? process.env.POSTGRES_HOST,
);
const databaseHost =
  process.env.DB_HOST ??
  process.env.PGHOST ??
  process.env.POSTGRES_HOST ??
  'localhost';
const databasePort = toNumber(
  process.env.DB_PORT ?? process.env.PGPORT ?? process.env.POSTGRES_PORT,
  5432,
);
const databaseName =
  process.env.DB_DATABASE ??
  process.env.DB_NAME ??
  process.env.PGDATABASE ??
  process.env.POSTGRES_DB ??
  'postgres';

if (process.env.NODE_ENV === 'production' && !databaseUrl && !hasDatabaseHost) {
  throw new Error(
    'Database configuration is missing. Set DATABASE_URL or DB_HOST/DB_PORT/DB_USERNAME/DB_PASSWORD/DB_DATABASE in Railway Variables.',
  );
}

console.log(
  databaseUrl
    ? 'Database config: using DATABASE_URL'
    : `Database config: using host=${databaseHost} port=${databasePort} database=${databaseName}`,
);

export const Db_DataSource = new DataSource({
  type: 'postgres',
  ...(databaseUrl
    ? { url: databaseUrl }
    : {
        host: databaseHost,
        port: databasePort,
        username:
          process.env.DB_USERNAME ??
          process.env.PGUSER ??
          process.env.POSTGRES_USER ??
          'postgres',
        password:
          process.env.DB_PASSWORD ??
          process.env.PGPASSWORD ??
          process.env.POSTGRES_PASSWORD ??
          'postgres123',
        database: databaseName,
      }),
  ssl,
  entities: [...EntitiesConfigurations],
  migrations: [join(__dirname, '../Migrations/*{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
  migrationsTableName: '__nest_migrations',
});
