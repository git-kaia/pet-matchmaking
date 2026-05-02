/**
 * MATCH FEEDBACK SCRIPT (NORWEGIAN UI OUTPUT)
 *
 * Purpose:
 * - Convert scoring system into user-understandable feedback
 * - Explain WHY match is good or bad
 * - Provide structured Norwegian UI text
 */

// to run this test: "npm run test:matchFeedbackNorwegian"

import { getMatchingService } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';

import { generateMatchFeedback } from '../../services/matching/feedback/matchFeedback.service';


test('MATCH FEEDBACK', () => {

    const adopter = createTestAdopter({
    id: 'feedback_adopter',
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
    id: 'feedback_bird',
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

  const result = getMatchingService(bird).execute(adopter);
  const feedback = generateMatchFeedback(result);

  console.log('\n--- FEEDBACK ---');
  console.log(feedback);

  expect(feedback).toBeDefined();
  expect(typeof feedback.percentage).toBe('number');

  expect(Array.isArray(feedback.positives)).toBe(true);
  expect(Array.isArray(feedback.negatives)).toBe(true);

  expect(typeof feedback.conclusion).toBe('string');
});