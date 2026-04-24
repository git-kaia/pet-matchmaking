// match.repository.ts
/**
 * Match Repository
 *
 * Handles persistence of matching results.
 *
 * Responsibilities:
 * - Store match scores between adopters and pets
 * - Persist rule evaluation outcomes for debugging and analysis
 *
 * This repository is write-focused and does not map data into domain entities.
 * It operates directly on database structures.
 */

import { pool } from '../db/db';

export const saveMatch = async (
  adopterId: string,
  petId: string,
  score: number
) => {
  const result = await pool.query(
    `INSERT INTO matches (adopter_id, pet_id, score)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [adopterId, petId, score]
  );

  return result.rows[0].id;
};

export const saveMatchRuleResults = async (
  matchId: string,
  rules: { ruleName: string; passed: boolean }[]
) => {
  for (const r of rules) {
    await pool.query(
      `INSERT INTO match_rule_results (match_id, rule_name, result)
       VALUES ($1, $2, $3)`,
      [
        matchId,
        r.ruleName,
        r.passed ? 'passed' : 'failed'
      ]
    );
  }
};