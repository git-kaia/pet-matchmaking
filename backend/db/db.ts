import { Pool } from "pg";
// @ts-ignore
import pkg from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pet_matchmaking",
  password: "password",
  port: 5432,
});