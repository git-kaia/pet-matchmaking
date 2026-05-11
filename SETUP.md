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



## PostgreSQL Database Setup
The project uses a local PostgreSQL database.


### 1. Install PostgreSQL

Download and install PostgreSQL:

- https://www.postgresql.org/download/

During installation:

- Remember the password you create for the `postgres` user


### 2. Open PostgreSQL

Open:
- PowerShell (Windows)
- Terminal (Mac/Linux)

Connect using the default postgres user:

```bash
psql -U postgres
```

If prompted, enter your PostgreSQL password.

### 3. Create Database User

Inside PostgreSQL:

```sql
CREATE ROLE myadmin WITH LOGIN SUPERUSER PASSWORD 'yourpassword';
```

### 4. Create Database

```sql
CREATE DATABASE pet_matchmaking OWNER myadmin;
```

Exit PostgreSQL:

```sql
\q
```

### Database Schema and Seed

The project includes:

- `schema.sql` → creates database tables
- `seed.sql` → inserts mock data

These files are located in:

```txt
backend/db/sql/
```


### Running Schema and Seed Files

Open PostgreSQL again and naviage to the project:

```bash
psql -U postgres -h localhost -W
```

```bash
\c pet_matchmaking
```

Inside PostgreSQL, run:

```sql
\i 'FULL_PATH_TO_PROJECT/backend/db/sql/schema.sql'
```

Then:

```sql
\i 'FULL_PATH_TO_PROJECT/backend/db/sql/seed.sql'
```

Example:

```sql
\i 'C:/path/to/project/backend/db/sql/schema.sql'
```

Important:
- Use the full absolute file path
- Use forward slashes (`/`) in the path
- Paths will differ depending on where the project is stored on your computer


## Environment Variables

Create a `.env` file inside the backend folder:

```env
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_matchmaking
```

## Testing

Testing is done from the backend, so navigate to the backend:
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

Hard rules test:
```bash
npm run test:hardRules
```

Match feedback test:
```bash
npm run test:matchFeedbackNorwegian
```

Scoring explanability test:
```bash
npm run test:scoringExplainability
```

Scoring rules scenario test:
```bash
npm run test:scoringScenario
```

Unit test: 
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
