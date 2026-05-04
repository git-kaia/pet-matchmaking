// To run: npx ts-node src/test/testDb.ts
import { pool } from '../infrastructure/db/db';

async function testDb() {
  const res = await pool.query('SELECT * FROM birds');
  console.log(res.rows);
}

testDb();