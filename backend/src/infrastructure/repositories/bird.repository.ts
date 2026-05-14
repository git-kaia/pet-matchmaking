// bird.repository.ts
/**
 * Bird Repository
 *
 * Handles persistence and retrieval of bird data.
 *
 * Responsibilities:
 * - Execute queries against the birds table
 * - Retrieve bird records from the database
 * - Use mapper to convert DB rows into Bird domain entities
 *
 * This repository may be extended to include joins with species data.
 * It does NOT contain matching logic or transformations.
 */

import { pool } from '../db/db';
import { Bird } from '../../domain/entities/bird';
import { mapBirdFromDb } from '../mappers/bird.mapper';

export const getAllBirds = async (): Promise<Bird[]> => {
  const result = await pool.query(`
    SELECT
      id,
      species_id,
      animal_type,

      size,
      noise_level,
      social_need,
      affection_level,

      experience_level,
      lifespan_years,

      time_required,
      mess_level,
      financial_burden,

      care_need,
      aggression_risk,
      behaviour_issues,

      bonding_style,
      requires_bird_partner,
      mental_stimulation_need,
      sleep_need,
      flight_need,
      diet_complexity

    FROM birds
  `);

  return result.rows.map(mapBirdFromDb);
};

export const getBirdById = async (id: string): Promise<Bird | null> => {
  const result = await pool.query(
    `
    SELECT
      id,
      species_id,
      animal_type,

      size,
      noise_level,
      social_need,
      affection_level,

      experience_level,
      lifespan_years,

      time_required,
      mess_level,
      financial_burden,

      care_need,
      aggression_risk,
      behaviour_issues,

      bonding_style,
      requires_bird_partner,
      mental_stimulation_need,
      sleep_need,
      flight_need,
      diet_complexity

    FROM birds
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ? mapBirdFromDb(result.rows[0]) : null;
};