/**
 * Scoring Explainability Test
 *
 * Purpose:
 * - Demonstrate how a final match score is constructed
 * - Provide full transparency into scoring rules
 *
 * This test:
 * - Uses 1 adopter and 1 bird
 * - Runs full pipeline (hard rules + scoring)
 * - Outputs detailed scoring breakdown
 */

// to run this test: "npm run test:scoringExplainability"

import { getMatchingService } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';

test('SCORING EXPLAINABILITY – full breakdown', () => {

  console.log('\n==============================');
  console.log('SCORING EXPLAINABILITY TEST');
  console.log('==============================\n');


  // Crafted adopter: Passes the hard rules and triggers mixed scoring outcomes
  const adopter = createTestAdopter({
    id: 'explain_adopter',

    dailyCareTime: 100,
    householdWorkPattern: 'flexible',
    commitmentHorizonYears: 15,

    noiseToleranceLevel: 'medium',
    cleaningTolerance: 'medium',

    lifeStability: 'medium',
    financialPriority: 'high',

    learningWillingness: 'high',

    desiredPetAffectionLevel: 'medium',
    desiredPetSociability: 'high',

    problemBehaviorTolerance: 'medium',
    aloneTimeHours: 'high',
  });

  // Crafted bird: Triggers mixed scoring outcomes
  const bird = createTestBird({
    id: 'bird5',

    timeRequired: 60,
    noiseLevel: 'medium',
    socialNeed: 'high',
    affectionLevel: 'medium',

    lifespanYears: 20,
    experienceLevel: 'intermediate',

    messLevel: 'medium',
    financialBurden: 'medium',

    behaviourIssues: 'medium',
  });

  const service = getMatchingService(bird);
  const result = service.execute(adopter);

  console.log('--- MATCH RESULT ---');
  console.log({
    rejected: result.rejected,
    reason: result.rejectionReason ?? 'OK',
    totalScore: result.score,
    welfareScore: result.welfareScore,
    humanScore: result.humanScore,
  });

  // Stop if rejected (should not happen in this test)
  if (result.rejected) {
    console.log('\nMatch rejected early → no scoring performed.');
    expect(result.rejected).toBe(false);
    return;
  }

  console.log('\n--- RULE BREAKDOWN ---');

  let total = 0;
  let welfareTotal = 0;
  let humanTotal = 0;

  result.rules.forEach((rule: any) => {
    const name = String(rule.ruleName);

    console.log(
      `${name.padEnd(30)} | ${rule.scoreType} | ${rule.value}`
    );

    total += rule.value;

    if (rule.scoreType === 'welfare') welfareTotal += rule.value;
    if (rule.scoreType === 'human') humanTotal += rule.value;
  });

  console.log('\n--- AGGREGATION CHECK ---');
  console.log(`Calculated total: ${total}`);
  console.log(`Engine total:     ${result.score}`);
  


  // Correct normalization for range [-max → +max] -130 → +130 becomes 0% → 100%
  const MAX_PER_RULE = 10;
  const MIN_PER_RULE = -10;

  const ruleCount = result.rules.length;

  const theoreticalMax = ruleCount * MAX_PER_RULE;
  const theoreticalMin = ruleCount * MIN_PER_RULE;

  const percentage = Math.round(
    ((result.score - theoreticalMin) /
      (theoreticalMax - theoreticalMin)) *
      100
  );

  console.log(`(Range: ${theoreticalMin} → ${theoreticalMax})`);

  // Clean summary of the match
  console.log('\n==============================');
  console.log('FINAL MATCH SUMMARY');
  console.log('==============================');

  console.table([
    {
      Metric: 'Total Score',
      Value: result.score,
    },
    {
      Metric: 'Welfare Score',
      Value: welfareTotal,
    },
    {
      Metric: 'Human Score',
      Value: humanTotal,
    },
    {
      Metric: 'Match Percentage',
      Value: `${percentage}%`, // percentage score
    },
    {
      Metric: 'Rules Evaluated',
      Value: result.rules.length,
    },
  ]);

  //  Detailed rule table
  console.log('\n--- DETAILED RULE TABLE ---');

  console.table(
    result.rules.map((r: any) => ({
      Rule: r.ruleName,
      Type: r.scoreType,
      Points: r.value,
    }))
  );

  // Assertions
  expect(result.rejected).toBe(false);
  expect(result.score).toBeGreaterThan(0);
  expect(result.rules.length).toBeGreaterThan(5);
});