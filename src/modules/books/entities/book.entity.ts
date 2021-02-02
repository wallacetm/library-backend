import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { BookDTO } from '../dtos/book.dto';

@Entity('books')
export class BookEntity {

  constructor(partial: Partial<BookEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column({ type: 'datetime' })
  publishedDate: Date;

  @Column()
  createdBy: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'datetime(\'now\')', nullable: false })
  createdDate: Date;

  @Column()
  updatedBy: string;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedDate: Date;

  toDto(): BookDTO {
    return new BookDTO({
      uuid: this.uuid,
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

BookEntity.prototype.toString = function () {
  return `[Book] -> Uuid: ${this.uuid}; Name: ${this.name}; Author: ${this.author}`
}