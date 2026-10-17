const express = require('express');

const app = express();
app.use(express.json());

let books = [];
let nextId = 1;

function resetStore() {
  books = [];
  nextId = 1;
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Story 1: add a book
app.post('/books', (req, res) => {
  const { title, author, isbn } = req.body || {};
  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'title, author and isbn are required' });
  }
  const book = { id: nextId++, title, author, isbn, available: true, issuedTo: null };
  books.push(book);
  return res.status(201).json(book);
});

// Story 2 + 4: list available books / search by title
app.get('/books', (req, res) => {
  let result = books;
  if (req.query.title) {
    const q = req.query.title.toLowerCase();
    result = result.filter((b) => b.title.toLowerCase().includes(q));
  }
  if (req.query.available === 'true') {
    result = result.filter((b) => b.available);
  }
  res.json(result);
});

// Story 3: issue a book
app.post('/books/:id/issue', (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  const { student } = req.body || {};
  if (!book) return res.status(404).json({ error: 'book not found' });
  if (!student) return res.status(400).json({ error: 'student is required' });
  if (!book.available) return res.status(409).json({ error: 'book already issued' });
  book.available = false;
  book.issuedTo = student;
  return res.json(book);
});

// Story 5: return a book
app.post('/books/:id/return', (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'book not found' });
  book.available = true;
  book.issuedTo = null;
  return res.json(book);
});

module.exports = app;
module.exports.resetStore = resetStore;
