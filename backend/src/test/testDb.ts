import { pool } from '../infrastructure/db/db';

async function testDb() {
  const res = await pool.query('SELECT * FROM species');
  console.log(res.rows);
}

testDb();