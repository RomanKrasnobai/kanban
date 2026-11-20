import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { baseDataSourceOptions } from './database.config';

// The CLI runs outside Nest, so ConfigModule never loads .env here.
// Node 24 has a built-in loader, so no dotenv package is needed.
if (existsSync('.env')) process.loadEnvFile('.env');

export default new DataSource({
  ...baseDataSourceOptions(),
  entities: [join(__dirname, '..', '**', '*.entity.ts')],
  migrations: [join(__dirname, 'migrations', '*.ts')],
});
