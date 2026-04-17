// to run testing script: npx ts-node src/test/matching.integration.test.ts

import { evaluateHardRules } from '../services/matching/engines/hardRule.engine';
import { evaluateHardRulesDetailed } from '../services/matching/engines/hardRule.debug.engine';
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

    for (const row of birdsRaw.rows) {
      const bird = mapBirdFromDB(row, row);

      const ctx = { adopter, pet: bird };

      const result = evaluateHardRulesDetailed(ctx, rules);

      console.log('\n--------------------------------');
      console.log(`BIRD: ${bird.id}`);
      console.log('--------------------------------');

      console.log('Adopter:', {
        dailyCareTime: adopter.dailyCareTime,
        commitment: adopter.commitmentHorizonYears,
        aloneTime: adopter.aloneTimeHours,
      });

      console.log('Bird:', {
        lifespan: bird.lifespanYears,
        requiresPartner: bird.requiresBirdPartner,
      });

      console.table(
        result.rules.map(r => ({
          rule: r.rule,
          passed: r.passed,
          reason: r.reason,

          adopter: JSON.stringify(r.adopter),
          pet: JSON.stringify(r.pet),
        }))
      );

      console.log('FINAL RESULT:', {
        rejected: result.rejected,
        reason: result.rejectionReason || 'All rules passed',
      });

    }
  }
};

runTest();