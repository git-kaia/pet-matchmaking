import { evaluateHardRules } from '../services/matching/engines/hardRule.engine';
import { generalHardRules } from '../services/matching/rules/general/generalHardRules';
import { birdHardRules } from '../services/matching/rules/species/bird/birdHardRules';

import { mapBirdFromDB } from '../services/matching/mapper/bird.mapper';
import { mapAdopterFromDB } from '../services/matching/mapper/adopter.mapper';

import { pool } from '../../db/db';

const runTest = async () => {
  const birdsRaw = await pool.query(`
    SELECT b.*, s.*
    FROM birds b
    JOIN species s ON b.species_id = s.id
  `);

  const adoptersRaw = await pool.query(`SELECT * FROM adopters`);

  const rules = [...generalHardRules, ...birdHardRules];

  for (const adopterRow of adoptersRaw.rows) {
    const adopter = mapAdopterFromDB(adopterRow);

    console.log('\n - - - - - - - ');
    console.log('ADOPTER:', adopter.id);
    console.log('\n');

    for (const row of birdsRaw.rows) {
      const bird = mapBirdFromDB(row, row);

      const ctx = { adopter, pet: bird };

      const result = evaluateHardRules(ctx, rules);

      console.log({
        bird: bird.id,
        rejected: result.rejected,
        reason: result.reason || 'OK: passed hard rules',
      });
    }
  }
};

runTest();