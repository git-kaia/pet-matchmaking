// to run this test "npm run test:scoringExplainability"
import { matchAdopterWithPet } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';

import { generateMatchFeedback } from '../../services/matching/feedback/matchFeedback.service';


test('SCORING EXPLAINABILITY – full system validation', () => {

  console.log('SCORING EXPLAINABILITY TEST');

   // create adopter for test
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

  // create bird for test
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

  const result = matchAdopterWithPet(adopter, bird);

  console.log('MATCH RESULT');
  console.log({
    rejected: result.rejected,
    totalScore: result.score,
    percentage: result.percentage,
    welfareScore: result.welfareScore,
    humanScore: result.humanScore,
  });

  if (result.rejected) {
    expect(result.rejected).toBe(false);
    return;
  }

  // rules breakdown
  let total = 0;

result.rules.forEach((rule: any) => {
  const ruleName = String(rule.ruleName ?? "Unknown Rule");
  const scoreType = String(rule.scoreType ?? "general");
  const value = Number(rule.value ?? 0);

  console.log(
    `${ruleName.padEnd(30)} | ${scoreType.padEnd(10)} | ${value}`
  );

  total += value;
});


  // feedback generation
  console.log('\n AGGREGATION CHECK ');

  console.log(`Calculated total: ${total}`);
  console.log(`Engine total:     ${result.score}`);

  expect(total).toBe(result.score);

  
  // percentage
  console.log('\n PERCENTAGE ');
  console.log(`Match Percentage: ${result.percentage}%`);

  expect(result.percentage).toBeGreaterThanOrEqual(0);
  expect(result.percentage).toBeLessThanOrEqual(100);

  // feedback explainability
  const feedback = generateMatchFeedback(result);

  console.log('\n--- FEEDBACK ---');

  // positives 
  console.log('\n Positivt:');
  feedback.positives.forEach(p => console.log(`+ ${p}`));

  // negatives
  console.log('\n Negativt:');
  feedback.negatives.forEach(n => console.log(`- ${n}`));

  console.log('\n Konklusjon:');
  console.log(feedback.conclusion);

  // consistency
  expect(feedback.percentage).toBe(result.percentage);

  // sanity checks
  if (result.percentage >= 60) {
    expect(feedback.positives.length).toBeGreaterThan(0);
  }

  if (result.percentage < 50) {
    expect(feedback.negatives.length).toBeGreaterThan(0);
  }

  // final summary
  console.log('FINAL MATCH SUMMARY');

  console.table([
    {
      Metric: 'Total Score',
      Value: result.score,
    },
    {
      Metric: 'Match Percentage',
      Value: `${result.percentage}%`,
    },
    {
      Metric: 'Positive Factors',
      Value: feedback.positives.length,
    },
    {
      Metric: 'Negative Factors',
      Value: feedback.negatives.length,
    },
  ]);

  expect(result.rejected).toBe(false);
  expect(result.rules.length).toBeGreaterThan(5);
});