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

  const { freeFlightExpectation } = ctx.adopter;

  if (freeFlightExpectation === 'very_low') {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Insufficient out-of-cage time for bird'
    );
  }

  if (freeFlightExpectation === 'low') {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Limited out-of-cage time'
    );
  }

  if (freeFlightExpectation === 'medium') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate out-of-cage time'
    );
  }

  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Adequate out-of-cage time'
  );
};

// 03. Bird Diet Complexity
export const birdDietRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdDiet';

  const bird = ctx.pet as Bird;

  const tolerance = ctx.adopter.dietComplexityTolerance;
  const complexity = bird.dietComplexity;

  if (isHigh(complexity) && isLow(tolerance)) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Low tolerance for complex diet requirements'
    );
  }

  if (isHigh(complexity) && tolerance === 'medium') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate ability to handle complex diet'
    );
  }

  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Diet requirements manageable'
  );
};

// 04. Bird Sleep 
export const birdSleepRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdSleepEnvironment';

  const bird = ctx.pet as Bird;

  const commitment = ctx.adopter.sleepEnvironmentCommitment;
  const need = bird.sleepNeed;

  if (isHigh(need) && isLow(commitment)) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Insufficient sleep environment for high-need bird'
    );
  }

  if (isHigh(need) && commitment === 'medium') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate sleep environment for demanding bird'
    );
  }

  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Sleep environment adequate'
  );
};

// 05. Bird bonding style
export const birdBondingStyleRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'birdBondingStyle';

  const bird = ctx.pet as Bird;

  const desired = ctx.adopter.desiredBondingStyle;
  const actual = bird.bondingStyle;

  if (desired === actual) {
    return createScore(
      scoreType,
      SCORE.HIGH,
      ruleName,
      'Bonding style matches preference'
    );
  }

  // Strong mismatch: independent adopter + one-person bird
  if (desired === 'independent' && actual === 'one_person') {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Independent preference conflicts with strongly bonding bird'
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Partial mismatch in bonding style'
  );
};

// 06. Bird Flock Requirement
export const birdFlockRequirementRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'birdFlockRequirement';

  const bird = ctx.pet as Bird;

  const willingness = ctx.adopter.willingnessMultipleBirds;

  if (bird.requiresBirdPartner && isLow(willingness)) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Species requires bird companionship but adopter unwilling'
    );
  }

  if (bird.requiresBirdPartner && willingness === 'medium') {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Limited willingness to provide required bird companionship'
    );
  }

  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Flock needs supported'
  );
};