import { BookDTO } from './book.dto';
/**
 * @typedef PaginatedBooks
 * @property {number} skip Number of skipped books in this pagination.
 * @property {number} take Number of taken books in this pagination.
 * @property {number} total Number of total books in database.
 * @property {Array.<Book>} books Array of books.
 */
export class PaginatedBooksDTO {
  constructor(partial: Partial<PaginatedBooksDTO> = {}) {
    Object.assign(this, partial);
  }
  skip: number;
  take: number;
  books: BookDTO[];
  total: number;
}