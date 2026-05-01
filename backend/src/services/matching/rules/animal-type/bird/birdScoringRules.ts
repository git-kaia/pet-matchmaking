// birdScoringRules.ts
/**
 * Bird Scoring Rules
 *
 * Contains species-specific scoring logic for birds.
 *
 * Responsibilities:
 * - Evaluate compatibility between adopter and bird
 * - Contribute to welfare and human satisfaction scores
 *
 * No evaluation logic is contained here, only rule definitions.
 */
///////////////////////
// IMPORTS           //
///////////////////////

import { Bird } from '../../../../../domain/entities/bird';

// Types
import { ScoringRule } from '../../../types/scoring.types';

// Utils
import { levelMap, isHigh, isLow, distanceMixed } from '../../../utils/level.utils';
import { SCORE, createScore } from '../../../utils/scoring.utils';

///////////////////////
// RULES             //
///////////////////////

// 01. Bird Mental Stimulation
export const birdMentalStimulationRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdMentalStimulation';

  const bird = ctx.pet as Bird;

  const enrichment = ctx.adopter.enrichmentCommitment;
  const training = ctx.adopter.trainingInterest;
  const need = bird.mentalStimulationNeed;

  // Combine effort (take average dimension)
  const effortScore = Math.round(
    (levelMap[enrichment] + levelMap[training]) / 2
  );

  const needScore = levelMap[need];
  const gap = effortScore - needScore;

  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Stimulation far below requirement'
    );
  }

  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Stimulation slightly below requirement'
    );
  }

  if (gap === 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Stimulation matches requirement'
    );
  }

  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'High stimulation relative to needs'
  );
};

// 02. Bird Free Flight
export const birdFreeFlightRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdFreeFlight';

  const bird = ctx.pet as Bird;

  const expectation = ctx.adopter.freeFlightExpectation;
  const need = bird.flightNeed;

  const expectationScore = levelMap[expectation];
  const needScore = levelMap[need];

  const gap = expectationScore - needScore;

  // Strong mismatch (severe under-provision of flight time)
  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Flight time far below requirement'
    );
  }

  // Slight mismatch
  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Flight time slightly below requirement'
    );
  }

  // Match
  if (gap === 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Flight time meets requirement'
    );
  }

  // Exceeds requirement
  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'Flight time exceeds requirement'
  );
};

// 03. Bird Diet Complexity
export const birdDietRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdDiet';

  const bird = ctx.pet as Bird;

  const tolerance = ctx.adopter.dietComplexityTolerance;
  const complexity = bird.dietComplexity;

  const toleranceScore = levelMap[tolerance];
  const complexityScore = levelMap[complexity];

  const gap = toleranceScore - complexityScore;

  if (gap <= -2) {
    return createScore(scoreType, SCORE.CRITICAL, ruleName, 'Diet complexity far exceeds tolerance');
  }

  if (gap === -1) {
    return createScore(scoreType, SCORE.NEGATIVE, ruleName, 'Diet complexity slightly exceeds tolerance');
  }

  if (gap === 0) {
    return createScore(scoreType, SCORE.MEDIUM, ruleName, 'Diet complexity matches tolerance');
  }

  return createScore(scoreType, SCORE.HIGH, ruleName, 'High ability to manage diet complexity');
}

// 04. Bird Sleep 
export const birdSleepRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdSleepEnvironment';

  const bird = ctx.pet as Bird;

  const commitment = ctx.adopter.sleepEnvironmentCommitment;
  const need = bird.sleepNeed;

  const commitmentScore = levelMap[commitment];
  const needScore = levelMap[need];

  const gap = commitmentScore - needScore;

  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Sleep environment far below requirement'
    );
  }

  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Sleep environment slightly below requirement'
    );
  }

  if (gap === 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Sleep environment meets requirement'
    );
  }

  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'Sleep environment exceeds requirement'
  );
};

// 05. Bird bonding style
export const birdBondingStyleRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'birdBondingStyle';

  const bird = ctx.pet as Bird;

  const desired = ctx.adopter.desiredBondingStyle;
  const actual = bird.bondingStyle;

  // Perfect match
  if (desired === actual) {
    return createScore(
      scoreType,
      SCORE.HIGH,
      ruleName,
      'Bonding style matches preference'
    );
  }

  // Strong mismatch (risk)
  if (desired === 'independent' && actual === 'one_person') {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Independent preference conflicts with strongly bonding bird'
    );
  }

  // Moderate mismatch
  if (desired === 'multiple_people' && actual === 'one_person') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Bird may bond strongly to one person in multi-person household'
    );
  }

  // Mild mismatch
  if (desired === 'one_person' && actual === 'independent') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Bird may be less affectionate than desired'
    );
  }

  // Flexible / acceptable cases
  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Bonding style acceptable'
  );
};

// 06. Bird Flock Requirement
// Deals with cases not rejected by hard rule
export const birdFlockRequirementRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdFlockRequirement';

  const bird = ctx.pet as Bird;
  const willingness = ctx.adopter.willingnessMultipleBirds;

  // No requirement → neutral
  if (!bird.requiresBirdPartner) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'No flock requirement'
    );
  }

  // Medium willingness → some risk
  if (willingness === 'medium') {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Limited willingness to provide required bird companionship'
    );
  }

  // High willingness → good
  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Flock needs supported'
  );
};