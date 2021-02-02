import * as request from 'supertest';
import app from '../src/app';

const TO_TEST_BOOK = {
  uuid: 'e36b53d7-909f-4194-8a75-957f6d611e84',
  name: 'Nome do livro - 1',
  author: 'Nome do autor - 1',
  description: 'Breve descrição do livro - 1',
  updatedBy: 'SISTEMA',
  createdBy: 'SISTEMA'
};

const PARTIAL_BOOK = {
  name: 'Nome do livro - 1',
  author: 'Nome do autor - 1',
  description: 'Breve descrição do livro - 1',
  publishedDate: new Date().toString()
};

describe('Test the application', () => {
  test('It should response the GET /books', done => {
    request(app)
      .get('/books')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.books.length).toBe(6)
        expect(response.body.total).toBe(6)
        expect(response.body.take).toBeUndefined()
        expect(response.body.skip).toBeUndefined()
        done();
      });
  });
  test('It should response the GET /books/:uuid', done => {
    request(app)
      .get(`/books/${TO_TEST_BOOK.uuid}`)
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(TO_TEST_BOOK.name);
        expect(response.body.updatedBy).toBe(TO_TEST_BOOK.updatedBy);
        done();
      });
  });
  test('It should response the POST /books', done => {
    request(app)
      .post('/books')
      .send(PARTIAL_BOOK)
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(201);
        expect(response.body.book).toMatchObject(PARTIAL_BOOK);
        expect(typeof response.body.book.uuid).toBe('string');
        expect(response.body.self).toBe(`/books/${response.body.book.uuid}`);
        expect(response.body.book.updatedBy).toEqual('admin');
        expect(response.body.book.createdBy).toEqual('admin');
        expect(response.body.book.updatedDate).not.toBeNull();
        expect(response.body.book.createdDate).not.toBeNull();
        done();
      });
  });
  test('It should response the POST /books with validation errors', done => {
    request(app)
      .post('/books')
      .send({ ...PARTIAL_BOOK, name: new Array(30).fill('xpto', 0, 30).join('') })
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.details.length).toBe(1);
        expect(response.body.details[0].property).toBe('name');
        done();
      });
  });
  test('It should response the PUT /books/:uuid', done => {
    request(app)
      .put(`/books/${TO_TEST_BOOK.uuid}`)
      .send(PARTIAL_BOOK)
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(PARTIAL_BOOK);
        expect(response.body.updatedBy).toEqual('admin');
        expect(response.body.updatedDate).not.toBeNull();
        done();
      });
  });
  test('It should response the PUT /books/:uuid with not found', done => {
    request(app)
      .put('/books/1234214123142')
      .send(PARTIAL_BOOK)
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });
  test('It should response the PUT /books/:uuid with validation errors', done => {
    request(app)
      .put(`/books/${TO_TEST_BOOK.uuid}`)
      .send({ ...PARTIAL_BOOK, name: new Array(30).fill('xpto', 0, 30).join(''), publishedDate: 'nao é uma data :)' })
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.details.length).toBe(2);
        expect(response.body.details[0].property).toBe('name');
        expect(response.body.details[1].property).toBe('publishedDate');
        done();
      });
  });
  test('It should response the DELETE /books/:uuid', done => {
    request(app)
      .delete(`/books/${TO_TEST_BOOK.uuid}`)
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(204);
        request(app)
          .get(`/books/${TO_TEST_BOOK.uuid}`)
          .auth('admin', 'adminadmin', { type: 'basic' })
          .then(response => {
            expect(response.status).toBe(404);
            done();
          })
      });
  });
  test('It should response the DELETE /books/:uuid with not found', done => {
    request(app)
      .delete('/books/21312412123412')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });
  test('It should response the GET /books with pagination', done => {
    request(app)
      .get('/books?skip=1&take=2')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.books.length).toBe(2)
        expect(response.body.total).toBe(6)
        expect(response.body.take).toBe(2)
        expect(response.body.skip).toBe(1)
        done();
      });
  });
  test('It should response the GET /books with pagination and return 0 results', done => {
    request(app)
      .get('/books?skip=10&take=2&name=blablabla')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.books.length).toBe(0)
        expect(response.body.total).toBe(6)
        expect(response.body.take).toBe(2)
        expect(response.body.skip).toBe(10)
        done();
      });
  });
  test('It should response the GET /books with error', done => {
    request(app)
      .get('/books?skip=nonnumber')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(500);
        done();
      });
  });
  test('It should response the non auth request with unauthorized', done => {
    request(app)
      .get('/books')
      .then(response => {
        expect(response.status).toBe(401);
        done();
      });
  });
  test('It should response the incorrect password auth request with unauthorized', done => {
    request(app)
      .get('/books')
      .auth('admin', 'aaaa', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(401);
        done();
      });
  });
  test('It should response the incorrect username auth request with unauthorized', done => {
    request(app)
      .get('/books')
      .auth('aaaa', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(401);
        done();
      });
  });
  test('It should response the non routed request with 404', done => {
    request(app)
      .get('/users')
      .auth('admin', 'adminadmin', { type: 'basic' })
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });
});