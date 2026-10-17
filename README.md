# Library Management System - Agile Project with CI/CD

**Course:** Agile Software Development | **Assessment:** FA2 (Unit 3 and Unit 4)
**Group:** <Name 1> and <Name 2> | **Division:** <A/B>
**Stack:** Node.js, Express, Jest, ESLint, GitHub Actions, Docker (GHCR)

## 1. Product Vision
A lightweight REST service that lets librarians manage the book catalogue and issue/return books, and lets students find available books.

## 2. User Stories (Product Backlog)
| ID | User Story | Priority | Points |
|----|-----------|----------|--------|
| US1 | As a librarian, I want to add a book so that the catalogue stays current. | High | 3 |
| US2 | As a student, I want to view available books so that I can pick one to borrow. | High | 2 |
| US3 | As a librarian, I want to issue a book to a student so that borrowing is recorded. | High | 5 |
| US4 | As a student, I want to search books by title so that I can find them quickly. | Medium | 3 |
| US5 | As a librarian, I want to mark a book as returned so that availability stays accurate. | Medium | 2 |

## 3. Sprint Planning
**Sprint 1 (1 week, 15 story points)**
**Sprint Goal:** Deliver the core catalogue and issue/return flow with a working CI/CD pipeline.

| Day | Work | Points |
|-----|------|--------|
| 1 | Repo setup, US1 (add book) | 3 |
| 2 | US2 (view available books) | 2 |
| 3-4 | US3 (issue book) and US4 (search) | 8 |
| 5 | US5 (return book), pipeline finalisation, Sprint Review and Retrospective | 2 |

**Ceremonies:** Sprint Planning (Day 1), Daily Stand-up (15 min), Sprint Review and Retrospective (Day 5).
**Retrospective:** Went well - automated tests caught a double-issue bug early. To improve - write tests before the endpoints (TDD).

## 4. Definition of Done (DoD)
- Code merged to `main` through a pull request
- All unit tests pass (Jest)
- ESLint reports zero errors
- CI/CD pipeline is green
- Docker image deployed and `/health` verified
- README/API documentation updated

## 5. Acceptance Criteria (US1 - Add a Book)
- **Given** a librarian submits a book with title, author and ISBN, **when** the data is valid, **then** the API returns `201` and the book appears in the book list.
- **Given** a required field is missing, **when** the request is submitted, **then** the API returns `400` with an error message.
- **Given** a book is added, **then** it is marked `available: true` by default.

## 6. CI/CD Pipeline
`GitHub -> Build -> Automated Testing -> Code Quality Check -> Deployment`

| Stage | Tool | Job in `.github/workflows/ci-cd.yml` |
|-------|------|------|
| Source | GitHub | Triggered on push to `main` and on pull requests |
| Build | npm | `build` - `npm ci` |
| Automated Testing | Jest + Supertest | `test` - `npm test` |
| Code Quality | ESLint | `quality` - `npm run lint` |
| Deployment | Docker + GHCR | `deploy` - builds image, pushes to GitHub Container Registry, smoke-tests `/health` |

Deploy runs only on `main` and only after test and quality both pass.

## 7. Run Locally
```
npm install
npm test
npm run lint
npm start
```

## 8. API
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /books | Add a book |
| GET | /books?title=&available=true | List and search |
| POST | /books/:id/issue | Issue to a student |
| POST | /books/:id/return | Return a book |
| GET | /health | Health check |
