// hardRules.scenario.test.ts
// to run testing script: npm run test:hardRules

/**
 * Hard Rules Scenario Test
 *
 * Evaluates the behavior of hard rules using predefined scenarios.
 *
 * Responsibilities:
 * - Define realistic adopter and pet profiles (scenarios)
 * - Execute multiple hard rules together
 * - Output detailed rule-by-rule results
 * - Provide insight into why matches are accepted or rejected
 *
 * This test is used for qualitative evaluation of decision logic,
 * focusing on realism, consistency, and transparency.
 * It does NOT strictly verify correctness (see unit tests for that).
 */

// Profile imports
// Importere fra hard coded profiler istedet

// Engine imports
import { evaluateHardRulesDetailed } from '../../services/matching/debug/hardRule.debug.engine';

// Rule imports
import { generalHardRules } from '../../services/matching/rules/general/generalHardRules';
import { birdHardRules } from '../../services/matching/rules/animal-type/bird/birdHardRules';

import { birdProfiles } from '../helpers/profiles/birdProfiles';
import { adopterProfiles } from '../helpers/profiles/adopterProfiles';


describe('Hard Rules Scenario Tests', () => {

  test('should evaluate all adopter/pet scenarios without crashing', async () => {

    const pets = birdProfiles;
    const adopters = adopterProfiles;

    for (const adopter of adopters) {

      console.log('\n - - - - - - - ');
      console.log('ADOPTER:', adopter.id);

      for (const pet of pets) {

        if (pet.animalType !== 'bird') continue;

        const rules = [
          ...generalHardRules,
          ...birdHardRules,
        ];

        const ctx = {
          adopter,
          pet,
        };

        const result = evaluateHardRulesDetailed(ctx, rules);

        console.log('\n--------------------------------');
        console.log(`MATCH: ${pet.id} & ${adopter.id}`);
        console.log('--------------------------------');

        console.log('Adopter:', {
          adopter: adopter.id,
          dailyCareTime: adopter.dailyCareTime,
          commitmentYears: adopter.commitmentHorizonYears,
        });

        console.log('Bird:', {
          bird: pet.id,
          birdtype: pet.speciesId,
          lifespan: pet.lifespanYears,
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

        // Basic sanity assertion
        expect(result).toBeDefined();
      }
    }

  });

});