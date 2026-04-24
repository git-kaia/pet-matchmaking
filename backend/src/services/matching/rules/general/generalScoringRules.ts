// generalScoringRules.ts
/**
 * General Scoring Rules
 *
 * Contains species-independent scoring logic.
 *
 * Responsibilities:
 * - Evaluate compatibility between adopter and pet
 * - Contribute to welfare and human satisfaction scores
 *
 * These rules apply across all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */

///////////////////////
// IMPORTS           //
///////////////////////

import { ScoringRule } from '../../types/scoring.types';
import { Level } from '../../../../domain/types/common.types';

///////////////////////
// UTILS             //
///////////////////////

// Utility to convert levels to numeric values for distance calculation
const levelMap = {
  very_low: 0,
  low: 1,
  medium: 2,
  high: 3,
  very_high: 4,
};

// Helper for levelMap comparisons
const distance = (a: Level, b: Level) => {
  return Math.abs(levelMap[a] - levelMap[b]);
};

// Helper stating high side of the level spectrum
const isHigh = (level: Level) =>
  level === 'high' || level === 'very_high';

// Helper to create score (to avoid duplicate code for each rule)
const createScore = (
  scoreType: 'welfare' | 'human',
  value: number,
  ruleName: string,
  description: string
) => ({
  scoreType,
  value,
  rule: { ruleName, description }
});

// Helper for score values
const SCORE = {
  HIGH: 10,
  MEDIUM: 5,
  LOW: 0,
  NEGATIVE: -5,
  CRITICAL: -10
};

///////////////////////
// RULES             //
///////////////////////

// 01. Time Availability Rule
export const timeAvailabilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'timeAvailability' as const;

  const available = ctx.adopter.dailyCareTime;
  const required = ctx.pet.timeRequired;

  const gap = available - required;

  // Plenty of extra time
  if (gap >= 60) {
    return createScore(
      scoreType,
      SCORE.HIGH,
      ruleName,
      'More than sufficient daily care time',
    );
  }

  // Just enough time
  if (gap >= 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Sufficient daily care time',
    );
  }

  // Not enough time
  return createScore(
    scoreType,
    SCORE.CRITICAL,
    ruleName,
    'Insufficient daily care time',
  )
};

// 02. Noise Tolerance Rule
export const noiseToleranceRule: ScoringRule = (ctx) => {
  const d = distance(
    ctx.adopter.noiseToleranceLevel,
    ctx.pet.noiseLevel
  );

  const scoreType = 'human' as const;
  const ruleName = 'noiseTolerance' as const;

  if (d === 2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'High mismatch in noise tolerance',
    );
  }

  if (d === 1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Moderate mismatch in noise tolerance',
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Good noise compatibility',
  )
};

// 03. Alone Time Risk
export const aloneTimeRiskRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'aloneTimeRisk' as const;

  const { aloneTimeHours } = ctx.adopter;
  const { socialNeed } = ctx.pet;

  if (aloneTimeHours === 'high' && isHigh(socialNeed)) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'High alone time with highly social pet',
    );
  }

  if (aloneTimeHours === 'medium' && isHigh(socialNeed)) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Moderate alone time with social pet',
    )
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Alone time acceptable',
  );
};

// 04. Life Stability
export const lifeStabilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'lifeStability' as const;

  const { lifeStability } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  if (lifeStability === 'low' && lifespanYears >= 20) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Low life stability for long-lived pet',
    );
  }

  if (lifeStability === 'medium' && lifespanYears >= 30) {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate stability for very long-lived pet',
    );
  }

  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'Life stability sufficient',
  );
};

// 05. Commitment vs Lifespan
export const commitmentRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'commitmentVsLifespan' as const;

  const { commitmentHorizonYears } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  if (commitmentHorizonYears < lifespanYears * 0.5) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Very low commitment vs lifespan',
    );
  }

  if (commitmentHorizonYears < lifespanYears) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Moderate commitment mismatch',
    )
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Commitment sufficient',
  );
};

// 06. Experience Match
// Rule should reflect that experience equal to or higher than needed experience level for 
// pets gives the highest points, but if its less then required level for pet user should 
// be given penalties
export const experienceMatchRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'experienceMatch' as const;

  const { hasPetExperience, experienceYears } = ctx.adopter;
  const { experienceLevel } = ctx.pet;

  const birdExp = experienceYears?.bird || 0;

  // Map adopter experience → level
  const adopterLevel = !hasPetExperience
    ? 0
    : birdExp >= 5
      ? 2 // experienced
      : birdExp >= 2
        ? 1 // intermediate
        : 0; // beginner

  const experienceMap = {
    beginner: 0,
    intermediate: 1,
    experienced: 2,
    advanced: 3,
  };

  const petLevel = experienceMap[experienceLevel];

  const gap = adopterLevel - petLevel;

  // Strong mismatch
  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Adopter experience significantly underqualified for pet',
    );
  }

  // Mild mismatch
  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Adopter experience slightly underqualified',
    );
  }

  // Good match or overqualified
  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Experience matches or exceeds requirement',
  );
};

// 07. Learning Willingness
export const learningWillingnessRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'learningWillingness' as const;

  const { hasPetExperience, learningWillingness } = ctx.adopter;

  if (!hasPetExperience && learningWillingness === 'high') {
    return createScore(
      scoreType,
      SCORE.HIGH,
      ruleName,
      'High willingness to learn',
    );
  }

  if (!hasPetExperience && learningWillingness === 'medium') {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Moderate willingness to learn',
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'No learning bonus',
  );
};

// 08. Cleaning Tolerance
export const cleaningToleranceRule: ScoringRule = (ctx) => {
  const scoreType = 'human' as const;
  const ruleName = 'cleaningTolerance' as const;

  const { cleaningTolerance } = ctx.adopter;
  const { messLevel } = ctx.pet;

  if (cleaningTolerance === 'low' && isHigh(messLevel)) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Low cleaning tolerance for messy pet',
    )
  }

  if (cleaningTolerance === 'medium' && isHigh(messLevel)) {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate cleaning mismatch',
    )
  }

  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Cleaning tolerance acceptable',
  )
};

// 09. Financial priority
export const financialPriorityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'financialPriority';

  const { financialPriority } = ctx.adopter;
  const { financialBurden } = ctx.pet;

  if (!financialBurden) {
    return createScore(scoreType, SCORE.LOW, ruleName, 'No cost data');
  }

  if (financialPriority === 'low' && isHigh(financialBurden)) {
    return createScore(scoreType, SCORE.CRITICAL, ruleName, 'Low budget for high-cost pet');
  }

  if (financialPriority === 'medium' && isHigh(financialBurden)) {
    return createScore(scoreType, SCORE.NEGATIVE, ruleName, 'Moderate budget mismatch');
  }

  return createScore(scoreType, SCORE.LOW, ruleName, 'Financial capacity acceptable');
};

// 10. Children compatibility
export const childrenCompatibilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'childrenCompatibility';

  const { kidsAge } = ctx.adopter;
  const { size, affectionLevel, socialNeed } = ctx.pet;

  if (kidsAge !== 'under_ten') {
    return createScore(scoreType, SCORE.LOW, ruleName, 'No young children');
  }

  if (
    (size === 'large' || size === 'very_large') &&
    ['medium', 'high', 'very_high'].includes(affectionLevel)
  ) {
    return createScore(scoreType, SCORE.CRITICAL, ruleName, 'Large affectionate pet with young children');
  }

  if (isHigh(socialNeed)) {
    return createScore(scoreType, SCORE.NEGATIVE, ruleName, 'Highly social pet with young children');
  }

  return createScore(scoreType, SCORE.LOW, ruleName, 'Children compatibility acceptable');
};

// 11. Desired Socialbilty 
export const desiredSociabilityRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'desiredSociability';

  const d = distance(
    ctx.adopter.desiredPetSociability,
    ctx.pet.socialNeed
  );

  if (d === 2) {
    return createScore(scoreType, -8, ruleName, 'High mismatch in sociability');
  }

  if (d === 1) {
    return createScore(scoreType, -4, ruleName, 'Moderate mismatch in sociability');
  }

  return createScore(scoreType, 4, ruleName, 'Good sociability match');
};

// 12. Affection Expectation
export const affectionExpectationRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'affectionExpectation';

  const d = distance(
    ctx.adopter.desiredPetAffectionLevel,
    ctx.pet.affectionLevel
  );

  if (d === 2) {
    return createScore(scoreType, -6, ruleName, 'High mismatch in affection');
  }

  if (d === 1) {
    return createScore(scoreType, -3, ruleName, 'Moderate mismatch in affection');
  }

  return createScore(scoreType, 3, ruleName, 'Good affection match');
};

export const behaviorToleranceRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'behaviorTolerance';

  const { problemBehaviorTolerance } = ctx.adopter;
  const { experienceLevel } = ctx.pet;

  if (
    problemBehaviorTolerance === 'low' &&
    (experienceLevel === 'experienced' || experienceLevel === 'advanced')
  ) {
    return createScore(scoreType, SCORE.CRITICAL, ruleName, 'Low tolerance for complex pet');
  }

  if (
    problemBehaviorTolerance === 'medium' &&
    experienceLevel === 'advanced'
  ) {
    return createScore(scoreType, SCORE.NEGATIVE, ruleName, 'Moderate tolerance mismatch');
  }

  return createScore(scoreType, SCORE.LOW, ruleName, 'Behavior tolerance acceptable');
};

///////////////////////
// Rule exports      //
///////////////////////

export const generalScoringRules = [
  timeAvailabilityRule,
  noiseToleranceRule,
  aloneTimeRiskRule,
  lifeStabilityRule,
  commitmentRule,
  experienceMatchRule,
  learningWillingnessRule,
  cleaningToleranceRule,
  financialPriorityRule,
  childrenCompatibilityRule,
  desiredSociabilityRule,
  affectionExpectationRule,
  behaviorToleranceRule,
];