# Expense Tracker

Starting point for the Web Software Production course project.
This project will grow week by week.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend + PostgreSQL Database

Each part is an independent npm project with its own `node_modules`, and its own Biome config for linting/formatting.

## Running

**Compose** (http://localhost:8080):

The whole app including the client, server, and the database can be run through Docker Compose by running the command `docker compose up` . It will containerize each application and run them accordingly.

**Server** (http://localhost:3001):

```
cd server
npm install
npm run dev
```

Starts the Express API with `tsx watch`, so it restarts on file changes. Once it's up you should see `Server listening on http://localhost:3001` in the terminal.

```
src/
  app.ts                     # configures the Express app (middleware + routes)
  server.ts                  # entry point: starts listening
  types/expense.ts           # Expense / NewExpense types
  store/expense.ts           # PostgreSQL storage
  routes/expense.ts          # GET/POST/PUT/DELETE handlers, mounted at /api/expenses
```

Storage is in a PostgreSQL database (see `server/src/db/pool.ts`) configured through environment variables. The database needs to be running for the server to behave correctly. The database is configured in the `compose.yaml` file and can be started with the command `docker compose up -d db`.

Available endpoints, all under `/api`:

| Method | Path                  | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/expenses`       | List all expenses   |
| POST   | `/api/expenses`       | Create an expense   |
| PUT    | `/api/expenses/:id`   | Update an expense   |
| DELETE | `/api/expenses/:id`   | Delete an expense   |
| GET    | `/api/categories`     | List all categories |
| POST   | `/api/categories`     | Create a categories |
| PUT    | `/api/categories/:id` | Update a categories |
| DELETE | `/api/categories/:id` | Delete a categories |

You can try it without the client, e.g.:

```
curl http://localhost:3001/api/expenses
```

**Client** (http://localhost:5173):

```
cd client
npm install
npm run dev
```

Starts the Vite dev server with hot reload. The app calls the API directly at `http://localhost:3001`, so the server needs and the database to be running too (see above) — without it you'll see a "Failed to fetch" error in the browser console.

The UI is split by responsibility rather than kept in one file:

```
src/
  types/expense.ts          # Expense / NewExpense types
  api/expenses.ts           # the only place that calls fetch()
  hooks/useExpenses.ts      # owns the expenses state, exposes add/edit/remove
  utils/date.ts             # dd.mm.yyyy <-> ISO date conversion
  utils/currency.ts         # € formatting
  components/
    ExpenseForm.tsx         # add-expense form
    ExpenseList.tsx         # renders one ExpenseListItem per expense
    ExpenseListItem.tsx     # a row; toggles its own view/edit mode
    ExpenseTotal.tsx        # running total
  App.tsx                   # composition root, no fetch/state logic itself
```

## Linting

[Biome](https://biomejs.dev/) handles both linting and formatting — there's no separate Prettier/ESLint setup. `client/` and `server/` each have their own `biome.json`, so they can drift independently as the course progresses; there's no shared/root config to keep in sync.

Run from inside either project:

```
npm run lint      # check formatting, imports, and lint rules
npm run lint:fix  # same, but apply the fixes it can make automatically
```

`lint:fix` won't touch anything it can't fix safely (e.g. an unused variable) — it'll still report those for you to fix by hand.

## Testing

The project includes a test suite for the server. Unit tests `vitest` and integration tests use `supertest` additionally. The tests are stored in the `server/test` folder.

Run from inside `./server`:

```
npm test
```
# github-actions-test
