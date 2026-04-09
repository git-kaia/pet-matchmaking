# Backend Setup

This is the backend for the bachelor broject developing an appøocation for pet matchmaking.  
Built with **Node.js, Express, and TypeScript**.

## Installation

1. Navigate to the backend folder (if not in it already):

```bash
cd backend
```

Install dependencies:
```bash
npm install
```

## Running the backend

1. Start development server:

```bash
npm run dev
```
1. The server will run on:
- http://localhost:3000

## Local PostgreSQL database setup

1. Install PostgresSQL (https://www.postgresql.org/download/)
2. Add path to system environment variables (for easier system access)

3. Open PostgreSQL

- Open PowerShell (Windows) or Terminal (Mac/Linux).

4. Connect as the default postgres user
```
psql -U postgres
```

- You may be prompted for a password. If this fails, see troubleshooting below.

1. Create a database user

```
CREATE ROLE myadmin WITH LOGIN SUPERUSER PASSWORD 'yourpassword';
```

6. Create the database

```  
CREATE DATABASE pet_matchmaking OWNER myadmin;
```

7. Exit PostgreSQL

```
\q
```

8. Run schema and seed files
   
```
psql -U myadmin -d pet_matchmaking -f backend/db/sql/schema.sql
psql -U myadmin -d pet_matchmaking -f backend/db/sql/seed.sql
```

9. Configure environment variables

Create a .env file:

```
DB_USER=myadmin
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_matchmaking
```

## Running the db connection test script

1. Run command
```bash
npx ts-node src/testDb.ts
```

2. If connection is succesful content from the database table species will be logged.