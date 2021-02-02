import { ConnectionOptions } from 'typeorm';
import { DB_NAME } from '../../../constants';
import Books1612210227975 from '../migrations/1612210227975-books';
import Seeds1612210247031 from '../migrations/1612210247031-seeds';
import { BookEntity } from '../../books/entities/book.entity';
export const databaseTestConfig: ConnectionOptions = {
  type: 'sqlite',
  name: DB_NAME,
  database: ':memory:',
  migrations: [Books1612210227975, Seeds1612210247031],
  entities: [BookEntity],
  migrationsRun: true
};