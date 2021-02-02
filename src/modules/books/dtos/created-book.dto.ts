import { BookDTO } from './book.dto';
/**
 * @typedef CreatedBook
 * @property {string} self Self url.
 * @property {Book.model} book Book data.
 */
export class CreatedBookDTO {
  constructor(partial: Partial<CreatedBookDTO> = {}) {
    Object.assign(this, partial);
  }
  self: string;
  book: BookDTO
}