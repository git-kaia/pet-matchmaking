/**
 * Matching Integration Test
 *
 * Tests the full matching flow using real application services.
 *
 * Responsibilities:
 * - Retrieve adopters and pets from the service layer
 * - Execute matching pipelines via the dispatcher
 * - Apply hard rules and scoring rules together
 * - Output final match results
 *
 * This test validates that all parts of the system work together correctly.
 * It relies on real data and does not isolate individual rules.
 */

// matching.integration.test.ts

// to test run: "npm run test:integration"

import { getMatchingService } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';
import { Pet } from '../../domain/entities/pet';

test('MATCHING ENGINE – integration test', () => {

  console.log('\n');
  console.log('MATCHING INTEGRATION TEST');
  console.log('\n');

  const adopterHighCapacity = createTestAdopter({
    id: 'high_capacity',
    dailyCareTime: 180,
    commitmentHorizonYears: 20,
    householdWorkPattern: 'full_time',
  });

  const adopterNoTime = createTestAdopter({
    id: 'no_time',
    dailyCareTime: 0,
  });

  const adopterMismatch = createTestAdopter({
    id: 'mismatch',
    freeFlightExpectation: 'very_low',
  });

  const easyBird = createTestBird({
    id: 'easy_bird',
    careNeed: 'low',
    flightNeed: 'low',
  });

  const demandingBird = createTestBird({
    id: 'demanding_bird',
    careNeed: 'very_high',
    flightNeed: 'very_high',
  });

  const nonBird: Pet = {
    ...easyBird,
    id: 'not_a_bird',
    animalType: 'dog',
  };

  const scenarios = [
    { adopter: adopterHighCapacity, pet: easyBird },
    { adopter: adopterHighCapacity, pet: demandingBird },
    { adopter: adopterNoTime, pet: easyBird },
    { adopter: adopterMismatch, pet: demandingBird },
    { adopter: adopterHighCapacity, pet: nonBird },
  ];

  const summary: any[] = [];

  for (const { adopter, pet } of scenarios) {
    const service = getMatchingService(pet);
    const result = service.execute(adopter);

    console.log('\n--------------------------------');
    console.log(`Adopter: ${adopter.id}`);
    console.log(`Pet: ${pet.id} (${pet.animalType})`);
    console.log('--------------------------------');

    console.log({
      rejected: result.rejected,
      reason: result.rejectionReason ?? 'N/A',
      score: result.score,
      welfareScore: result.welfareScore,
      humanScore: result.humanScore,
      rulesApplied: result.rules?.length ?? 0,
    });

    summary.push({
      adopter: adopter.id,
      pet: pet.id,
      type: pet.animalType,
      rejected: result.rejected,
      score: result.score,
      reason: result.rejectionReason ?? 'OK',
    });

    // Assertions (important for integration test validity)
    if (pet.animalType !== 'bird') {
      expect(result.rejected).toBe(true);
    }

    if (adopter.id === 'no_time') {
      expect(result.rejected).toBe(true);
    }

    if (!result.rejected) {
      expect(result.score).toBeGreaterThan(0);
    }
  }

  console.log('\n==============================');
  console.log('FINAL SUMMARY');
  console.log('==============================');

  console.table(summary);

  expect(summary.length).toBe(5);
});