import { ConnectionOptions } from 'typeorm';
import { DB_NAME, DB_TYPE } from '../../../constants';
import Books1612210227975 from '../migrations/1612210227975-books';
import Seeds1612210247031 from '../migrations/1612210247031-seeds';
import { BookEntity } from '../../books/entities/book.entity';
export const databaseConfig: ConnectionOptions = {
  type: DB_TYPE,
  name: DB_NAME,
  database: process.env['DB_DATABASE'],
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  username: process.env['DB_PASS'],
  password: process.env['DB_USER'],
  migrations: [Books1612210227975, Seeds1612210247031],
  entities: [BookEntity],
  migrationsRun: true
};