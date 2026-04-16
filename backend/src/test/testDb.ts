import { pool } from '../../db/db';

async function testDb() {
  const res = await pool.query('SELECT * FROM species');
  console.log(res.rows);
}

testDb();