import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';
import * as logger from 'winston';
import { FindManyOptions } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { normalizeNumber } from '../../app/helpers/normalize-number.helper';
import { BookDTO } from '../dtos/book.dto';
import { validateOrReject } from 'class-validator';
import { PaginatedBooksDTO } from '../dtos/paginated-books.dto';
import { CreatedBookDTO } from '../dtos/created-book.dto';

export async function getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
  const service = new BookService();
  const query = req.query;
  try {
    const options: FindManyOptions<BookEntity> = {};
    if (query) {
      if (query.take) {
        options.take = normalizeNumber(query.take);
      }
      if (query.skip) {
        options.skip = normalizeNumber(query.skip);
      }
    }
    const total = await service.countBooks(options);
    if (total === 0) {
      res.json(new PaginatedBooksDTO({
        total,
        take: options.take,
        skip: options.skip,
        books: []
      }));
    } else {
      const books = await service.findBooks(options);
      res.json(new PaginatedBooksDTO({
        total,
        take: options.take,
        skip: options.skip,
        books
      }));
    }
  } catch (error) {
    logger.error(`Error trying to get books ${query ? `with query: ${JSON.stringify(query)}` : ''}`);
    next(error);
  }
}
export async function getOneBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  const service = new BookService();
  const uuid = req.params.uuid;
  const book = await service.findOneBook(uuid);
  if (!book) {
    next({ status: 404, message: `Book not found with uuid: ${uuid}` });
  } else {
    res.json(book);
  }
}
export async function putOneBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  let dto: BookDTO;
  try {
    dto = new BookDTO(req.body);
    await validateOrReject(dto);
  } catch (error) {
    logger.info('Validation error on updating a book', error);
    return next({ status: 400, message: 'Validation errors', details: error });
  }
  const service = new BookService();
  const uuid = req.params.uuid;
  dto.updatedBy = req.user.username;
  try {
    const result = await service.saveBook(dto, uuid)
    res.json(result)
  } catch (error) {
    logger.error(`Error trying to update a book with uuid: ${uuid}`, error)
    if (error.message.includes('Entity not found')) {
      return next({ status: 404, message: `Uuid not found: ${uuid}` });
    }
    next(error);
  }
}
export async function postOneBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  let dto: BookDTO;
  try {
    dto = new BookDTO(req.body);
    await validateOrReject(dto);
  } catch (error) {
    logger.info('Validation error on creating a book', error);
    return next({ status: 400, message: 'Validation errors', details: error });
  }
  const service = new BookService();
  dto.updatedBy = req.user.username;
  dto.createdBy = req.user.username;
  const result = await service.saveBook(dto)
  res.status(201).json(new CreatedBookDTO({
    self: `/books/${result.uuid}`,
    book: result
  }))
}
export async function deleteOneBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  const service = new BookService();
  const uuid = req.params.uuid;
  const { notFound } = await service.deleteBook(uuid);
  if (notFound) {
    next({ status: 404, message: `Book not found with uuid: ${uuid}` })
  } else {
    res.sendStatus(204);
  }
}