const request = require('supertest');
const app = require('../src/app');

beforeEach(() => app.resetStore());

const sample = { title: 'Clean Code', author: 'Robert Martin', isbn: '9780132350884' };

test('health endpoint returns ok', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('adds a book and returns 201', async () => {
  const res = await request(app).post('/books').send(sample);
  expect(res.status).toBe(201);
  expect(res.body.title).toBe('Clean Code');
  expect(res.body.available).toBe(true);
});

test('rejects a book with missing fields with 400', async () => {
  const res = await request(app).post('/books').send({ title: 'No Author' });
  expect(res.status).toBe(400);
  expect(res.body.error).toBeDefined();
});

test('lists books and searches by title', async () => {
  await request(app).post('/books').send(sample);
  await request(app).post('/books').send({ title: 'Refactoring', author: 'Martin Fowler', isbn: '1' });
  const all = await request(app).get('/books');
  expect(all.body).toHaveLength(2);
  const found = await request(app).get('/books?title=clean');
  expect(found.body).toHaveLength(1);
});

test('issues a book, blocks double issue, then returns it', async () => {
  const { body } = await request(app).post('/books').send(sample);
  const issued = await request(app).post(`/books/${body.id}/issue`).send({ student: 'Asha' });
  expect(issued.status).toBe(200);
  expect(issued.body.available).toBe(false);

  const again = await request(app).post(`/books/${body.id}/issue`).send({ student: 'Ravi' });
  expect(again.status).toBe(409);

  const returned = await request(app).post(`/books/${body.id}/return`);
  expect(returned.body.available).toBe(true);
});

test('returns 404 for unknown book', async () => {
  const res = await request(app).post('/books/99/issue').send({ student: 'Asha' });
  expect(res.status).toBe(404);
});
