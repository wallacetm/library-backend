import { IsEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsDate } from '../../app/decorators/is-date.decorator';
import { BookEntity } from '../entities/book.entity';

/**
 * @typedef Book
 * @property {string} uuid Book's uuid.
 * @property {string} name Book's name, max length is 100.
 * @property {string} description Book's short description.
 * @property {string} author Book's author.
 * @property {string} publishedDate Book's published date - eg: 2020-11-16T16:22:18.000Z.
 * @property {string} createdBy User who created the record in the database.
 * @property {string} createdDate Date and time the record was created in the database. - eg: 2020-11-16T16:22:18.000Z
 * @property {string} updatedBy User who last updated the record in the database.
 * @property {string} updatedDate Date and time the record was last updated in the database. - eg: 2020-11-16T16:22:18.000Z
 */
export class BookDTO {
  constructor(partial: Partial<BookDTO> = {}) {
    Object.assign(this, partial);
  }

  @IsEmpty()
  uuid: string;
  @MaxLength(100, {
    message: 'Property "name" cannot have more than 50 characters'
  })
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  author: string;
  @IsDate({
    message: 'Date must be in format 2020-11-16T16:22:18.000Z'
  })
  publishedDate: Date;

  @IsOptional()
  createdBy: string;
  @IsOptional()
  createdDate: Date;
  @IsOptional()
  updatedBy: string;
  @IsOptional()
  updatedDate: Date;

  toEntity(): BookEntity {
    return new BookEntity({
      name: this.name,
      description: this.description,
      author: this.author,
      publishedDate: this.publishedDate,
      createdBy: this.createdBy,
      createdDate: this.createdDate,
      updatedBy: this.updatedBy,
      updatedDate: this.updatedDate
    });
  }
}

BookDTO.prototype.toString = function () {
  return `[Book] -> ${this.uuid ? `Uuid: ${this.uuid}; ` : ''}Name: ${this.name}; Author: ${this.author}`
}