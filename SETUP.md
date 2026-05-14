# Project Setup

## Backend Setup

The backend is built with **Node.js, Express, TypeScript, and PostgreSQL**.

### Backend Installation

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```


### Running the Backend

Start the development server:

```bash
npm run dev
```

The backend will run on:

- http://localhost:3000



## PostgreSQL Setup

Create a local PostgreSQL database named:

```txt
pet_matchmaking
```

Then configure the backend environment variables in `backend/.env`:

```env
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_matchmaking
```

Run the schema and seed files located in:

```txt
backend/db/sql/
```

Example:

```bash
psql -U postgres -d pet_matchmaking -f backend/db/sql/schema.sql
psql -U postgres -d pet_matchmaking -f backend/db/sql/seed.sql
```

## Testing

Run tests from the backend folder:
```bash
cd backend
```

Database connection test:
```bash
npx ts-node src/test/testDb.ts
```

Matching integration test
```bash
npm run test:integration
```

Hard rules scenario test:
```bash
npm run test:hardRules
```

Scoring rules scenario test:
```bash
npm run test:scoringScenario
```

Match feedback test:
```bash
npm run test:matchFeedbackNorwegian
```

Scoring explanability test:
```bash
npm run test:scoringExplainability
```

Unit tests: 
```bash
npm run test:unit
```

## Frontend Setup

The frontend is built with:
- React
- TypeScript
- Vite


### Frontend Installation

1. Open a new terminal

2. Navigate to the frontend folder:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```


### Running the Frontend

Start the frontend development server:

```bash
npm run dev
```

The frontend will usually run on:

- http://localhost:5173

or 

- http://localhost:3001


## Running the Full Application (in order)

1. Start PostgreSQL (and seed database)
2. Start backend server
3. Start frontend server
