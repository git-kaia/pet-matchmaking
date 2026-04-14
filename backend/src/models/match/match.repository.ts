// match.repository.ts
// Handles:
// Saving match results to the database

import { pool } from '../../../db/db';

export const saveMatch = async (
  adopterId: string,
  birdId: string,
  score: number
) => {
  const result = await pool.query(
    `INSERT INTO matches (adopter_id, bird_id, score)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [adopterId, birdId, score]
  );

  return result.rows[0].id;
};

export const saveMatchRuleResults = async (
  matchId: string,
  rules: { rule: string; result: string }[]
) => {
  for (const r of rules) {
    await pool.query(
      `INSERT INTO match_rule_results (match_id, rule_name, result)
       VALUES ($1, $2, $3)`,
      [matchId, r.rule, r.result]
    );
  }
};