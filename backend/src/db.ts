import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bird_matching",
  password: "password",
  port: 5432,
});