import * as express from 'express';
import { deleteOneBook, getBooks, getOneBook, postOneBook, putOneBook } from '../controllers/book.controller';

export const bookRouter = express.Router();

/**
 * Search a list of books
 * @route GET /books
 * @param {string} name.param - name of the book to search
 * @param {string} author.param - author of the book to search
 * @param {string} description.param - description of the book to search
 * @param {string} publishedDate.param - published date of the book to search
 * @returns {PaginatedBooks.model} 200 - Books list
 */
bookRouter.get('/books', getBooks);
bookRouter.get('/books/:uuid', getOneBook);
bookRouter.put('/books/:uuid', putOneBook);
bookRouter.post('/books', postOneBook);
bookRouter.delete('/books/:uuid', deleteOneBook);
