// bird.repository.ts

import { pool } from '../db/db';
import { Bird } from '../../domain/entities/bird';
import { mapBirdFromDb } from '../mappers/bird.mapper';

export const getAllBirds = async (): Promise<Bird[]> => {
  const result = await pool.query(`
    SELECT *
    FROM birds
  `);

  return result.rows.map(mapBirdFromDb);
};

export const getBirdById = async (id: string): Promise<Bird | null> => {
  const result = await pool.query(
    `SELECT * FROM birds WHERE id = $1`,
    [id]
  );

  return result.rows[0] ? mapBirdFromDb(result.rows[0]) : null;
};

export const getAllBirdsWithSpecies = async () => {
  const result = await pool.query(`
    SELECT b.*, s.*
    FROM birds b
    JOIN bird_species s ON b.species_id = s.id
  `);

  return result.rows;
};