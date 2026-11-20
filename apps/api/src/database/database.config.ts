import type { DataSourceOptions } from 'typeorm';

type Env = Record<string, string | undefined>;

const required = (env: Env, key: string): string => {
  const value = env[key];

  if (!value) {
    throw new Error(`Missing required env var: ${key}`)
  }

  return value;
}

export const baseDataSourceOptions = (env: Env = process.env) => {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: Number(env.POSTGRES_PORT ?? 5432),
    username: required(env, 'POSTGRES_USER'),
    password: required(env, 'POSTGRES_PASSWORD'),
    database: required(env, 'POSTGRES_DB'),
    uuidExtension: 'pgcrypto',
    synchronize: false,
    logging: env.NODE_ENV === 'production' ? ['error'] : ['error', 'warn', 'migration'],
  } satisfies DataSourceOptions;
}
