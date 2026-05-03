import { matchAdopterWithPet } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';

test('SCORING EXPLAINABILITY – full breakdown', () => {

  console.log('\n==============================');
  console.log('SCORING EXPLAINABILITY TEST');
  console.log('==============================\n');

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

  // matchingEngine entry point
  const result = matchAdopterWithPet(adopter, bird);

  console.log('--- MATCH RESULT ---');
  console.log({
    rejected: result.rejected,
    reason: result.rejectionReason ?? 'OK',
    totalScore: result.score,
    welfareScore: result.welfareScore,
    humanScore: result.humanScore,
  });

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

  console.log('\n==============================');
  console.log('FINAL MATCH SUMMARY');
  console.log('==============================');

  console.table([
    { Metric: 'Total Score', Value: result.score },
    { Metric: 'Welfare Score', Value: welfareTotal },
    { Metric: 'Human Score', Value: humanTotal },
    { Metric: 'Match Percentage', Value: `${percentage}%` },
    { Metric: 'Rules Evaluated', Value: result.rules.length },
  ]);

  console.log('\n--- DETAILED RULE TABLE ---');

  console.table(
    result.rules.map((r: any) => ({
      Rule: r.ruleName,
      Type: r.scoreType,
      Points: r.value,
    }))
  );

  expect(result.rejected).toBe(false);
  expect(result.score).toBeGreaterThan(0);
  expect(result.rules.length).toBeGreaterThan(5);
});