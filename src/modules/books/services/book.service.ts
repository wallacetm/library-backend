import { FindManyOptions, getConnection, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { DB_NAME } from '../../../constants';
import * as logger from 'winston';
import { BookDTO } from '../dtos/book.dto';

export class BookService {
  private _repository: Repository<BookEntity>;

  get repository(): Repository<BookEntity> {
    if (!this._repository) {
      this._repository = getConnection(DB_NAME).getRepository(BookEntity);
    }
    return this._repository;
  }

  public async findBooks(options: FindManyOptions<BookEntity>): Promise<BookDTO[]> {
    const entities = await this.repository.find(options);
    if (entities && entities.length === 0) {
      return []
    }
    return entities.map(book => book.toDto());
  }

  public async countBooks(options: FindManyOptions<BookEntity>): Promise<number> {
    return this.repository.count(options);
  }

  public async findOneBook(uuid: string): Promise<BookDTO> {
    const entity = await this.repository.findOne(uuid);
    if (!entity) {
      return null;
    }
    return entity.toDto();
  }

  public async saveBook(book: BookDTO, uuid?: string): Promise<BookDTO> {
    if (uuid) {
      logger.info(`Updating ${book}`);
      const found = await this.findOneBook(uuid);
      if (!found) {
        throw new Error('Entity not found, use post instead');
      }
    } else {
      logger.info(`Creating ${book}`);
    }
    const entity = book.toEntity();
    entity.uuid = uuid;
    return (await this.repository.save(entity)).toDto();
  }

  public async deleteBook(uuid: string): Promise<{ notFound?: boolean }> {
    const toDeleteBook = await this.findOneBook(uuid);
    if (toDeleteBook) {
      logger.info(`Deleting ${toDeleteBook}`);
      await this.repository.delete(uuid);
      return { notFound: false }
    }
    return { notFound: true };
  }

}
