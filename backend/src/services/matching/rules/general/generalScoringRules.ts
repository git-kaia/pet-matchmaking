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

// Types
import { ScoringRule } from '../../types/scoring.types';

// Utils
import { levelMap, isHigh, isLow, distanceMixed } from '../../utils/level.utils';
import { SCORE, createScore } from '../../utils/scoring.utils';
import { getExperienceYears, hasExperienceForPet, getExperienceLevel } from '../../utils/experience.utils';

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
  const scoreType = 'human';
  const ruleName = 'noiseTolerance';

  const adopterTolerance = levelMap[ctx.adopter.noiseToleranceLevel];
  const petNoise = levelMap[ctx.pet.noiseLevel];

  // If adopter can tolerate equal or more → always fine
  if (petNoise <= adopterTolerance) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Noise level within tolerance'
    );
  }

  const difference = petNoise - adopterTolerance;

  // Pet is louder than tolerance
  if (difference >= 2) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Pet noise exceeds tolerance significantly'
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Pet noise slightly above tolerance'
  );
};

// 03. Alone Time Risk
export const aloneTimeRiskRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'aloneTimeRisk';

  const { aloneTimeHours } = ctx.adopter;
  const { socialNeed } = ctx.pet;

  // Worst case
  if (isHigh(aloneTimeHours) && isHigh(socialNeed)) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'High alone time with highly social pet'
    );
  }

  // Moderate mismatch
  if (
    (aloneTimeHours === 'medium' && isHigh(socialNeed)) ||
    (isHigh(aloneTimeHours) && socialNeed === 'medium')
  ) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Some mismatch between social needs and alone time'
    );
  }

  // Best case: demanding pet well supported
  if (isLow(aloneTimeHours) && isHigh(socialNeed)) {
    return createScore(
      scoreType,
      SCORE.HIGH,
      ruleName,
      'Adopter meets high social needs'
    );
  }

  // Good case: independent pet with acceptable availability
  if (
    isLow(socialNeed) &&
    (isLow(aloneTimeHours) || aloneTimeHours === 'medium')
  ) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Low social needs with acceptable availability'
    );
  }

  // Default acceptable
  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Alone time acceptable'
  );
};

// 04. Life Stability
export const lifeStabilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'lifeStability';

  const { lifeStability } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  // Map adopter stability → numeric
  const stabilityMap = {
    low: 0,
    medium: 1,
    high: 2,
  };

  const adopterLevel = stabilityMap[lifeStability];

  // Lifespan (3-tier model)
  const requiredLevel =
    lifespanYears > 15 ? 2 :   // long-lived pets
      lifespanYears > 5 ? 1 :    // medium-lived pets
        0;                         // short-lived pets

  const gap = adopterLevel - requiredLevel;

  // Strong mismatch
  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Life stability far below requirement'
    );
  }

  // Mild mismatch
  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Life stability below requirement'
    );
  }

  // Meets requirement
  if (gap === 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Life stability sufficient'
    );
  }

  // Exceeds requirement
  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'High life stability relative to needs'
  );
};

// 05. Commitment vs Lifespan
export const commitmentRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'commitmentVsLifespan';

  const { commitmentHorizonYears } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  // Cap unrealistic expectations (important for parrots etc.)
  const effectiveLifespan = Math.min(lifespanYears, 30);

  const ratio = commitmentHorizonYears / effectiveLifespan;

  // Very low commitment
  if (ratio < 0.5) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      'Very low commitment relative to expected care duration'
    );
  }

  // Slight mismatch
  if (ratio < 1) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Commitment below expected duration'
    );
  }

  // Meets expectation
  if (ratio < 1.5) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Commitment meets expected duration'
    );
  }

  // Strong commitment
  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    'Strong long-term commitment'
  );
};

// 06. Experience Match
// Rule should reflect that experience equal to or higher than needed experience level for 
// pets gives the highest points, but if its less then required level for pet user should 
// be given penalties
export const experienceMatchRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'experienceMatch';

  const petType = ctx.pet.animalType;

  const years = getExperienceYears(ctx);
  const adopterLevel = getExperienceLevel(years);

  const experienceMap = {
    beginner: 0,
    intermediate: 1,
    experienced: 2,
    advanced: 3,
  } as const;

  const petLevel = experienceMap[ctx.pet.experienceLevel];

  const gap = adopterLevel - petLevel;

  if (gap <= -2) {
    return createScore(
      scoreType,
      SCORE.CRITICAL,
      ruleName,
      `Experience far below requirement for ${petType}`
    );
  }

  if (gap === -1) {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      `Experience slightly below requirement for ${petType}`
    );
  }

  if (gap === 0) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      `Experience matches requirement for ${petType}`
    );
  }

  return createScore(
    scoreType,
    SCORE.HIGH,
    ruleName,
    `Highly experienced for ${petType}`
  );
};

// 07. Learning Willingness
export const learningWillingnessRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'learningWillingness';

  const petType = ctx.pet.animalType;

  const hasExperience = hasExperienceForPet(ctx);
  const { learningWillingness } = ctx.adopter;

  if (isHigh(learningWillingness)) {
    return createScore(
      scoreType,
      hasExperience ? SCORE.MEDIUM : SCORE.HIGH,
      ruleName,
      hasExperience
        ? `Experienced with ${petType}, high willingness to improve`
        : `No ${petType} experience but high willingness to learn`
    );
  }

  if (learningWillingness === 'medium') {
    return createScore(
      scoreType,
      hasExperience ? SCORE.LOW : SCORE.MEDIUM,
      ruleName,
      hasExperience
        ? `Experienced with ${petType}, moderate willingness`
        : `Limited ${petType} experience, moderate willingness to learn`
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'No learning bonus'
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

  if (
    (cleaningTolerance === 'medium' && isHigh(messLevel)) ||
    (cleaningTolerance === 'low' && messLevel === 'medium')
  ) {
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

  // Low burden → always acceptable
  if (financialBurden === 'low') {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Low financial burden'
    );
  }

  // High burden cases
  if (financialBurden === 'high') {
    if (financialPriority === 'low') {
      return createScore(
        scoreType,
        SCORE.NEGATIVE,
        ruleName,
        'Low budget for high-cost pet'
      );
    }

    if (financialPriority === 'medium') {
      return createScore(
        scoreType,
        SCORE.LOW,
        ruleName,
        'Moderate budget mismatch'
      );
    }

    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'High financial capacity for high-cost pet'
    );
  }

  // Medium burden cases
  if (financialBurden === 'medium') {
    if (financialPriority === 'low') {
      return createScore(
        scoreType,
        SCORE.LOW,
        ruleName,
        'Moderate budget mismatch'
      );
    }

    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Financial capacity acceptable'
    );
  }

  // Fallback (should never hit)
  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Financial capacity acceptable'
  );
};

// 10. Children compatibility
export const childrenCompatibilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare';
  const ruleName = 'childrenCompatibility';

  const { kidsAge } = ctx.adopter;
  const { affectionLevel, socialNeed } = ctx.pet;

  // No young children = neutral
  if (kidsAge !== 'under_ten') {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'No young children'
    );
  }

  const highSocial = isHigh(socialNeed);
  const highAffection = isHigh(affectionLevel);

  // Worst case
  if (highSocial && highAffection) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'High attention needs may be difficult to meet with young children'
    );
  }

  // Moderate mismatch
  if (highSocial || highAffection) {
    return createScore(
      scoreType,
      SCORE.LOW,
      ruleName,
      'Moderate attention demands in household with young children'
    );
  }

  // Good case
  return createScore(
    scoreType,
    SCORE.MEDIUM,
    ruleName,
    'Pet is suitable for household with young children'
  );
};

// 11. Desired Sociability
export const desiredSociabilityRule: ScoringRule = (ctx) => {
  const distance = distanceMixed(
    ctx.adopter.desiredPetSociability,
    ctx.pet.socialNeed
  );

  if (distance >= 2) {
    return createScore('human', SCORE.NEGATIVE, 'desiredSociability', 'High mismatch in sociability');
  }

  if (distance === 1) {
    return createScore('human', SCORE.LOW, 'desiredSociability', 'Moderate mismatch in sociability');
  }

  return createScore('human', SCORE.MEDIUM, 'desiredSociability', 'Good sociability match');
};

// 12. Affection expectation
export const affectionExpectationRule: ScoringRule = (ctx) => {
  const distance = distanceMixed(
    ctx.adopter.desiredPetAffectionLevel,
    ctx.pet.affectionLevel
  );

  if (distance >= 2) {
    return createScore('human', SCORE.NEGATIVE, 'affectionExpectation', 'High mismatch in affection');
  }

  if (distance === 1) {
    return createScore('human', SCORE.LOW, 'affectionExpectation', 'Moderate mismatch in affection');
  }

  return createScore('human', SCORE.MEDIUM, 'affectionExpectation', 'Good affection match');
};

// 13. Behaviour tolerance
export const behaviorToleranceRule: ScoringRule = (ctx) => {
  const scoreType = 'human';
  const ruleName = 'behaviorTolerance';

  const adopterTolerance = levelMap[ctx.adopter.problemBehaviorTolerance];
  const behaviourIssues = levelMap[ctx.pet.behaviourIssues];

  // If adopter can tolerate equal or more
  if (behaviourIssues <= adopterTolerance) {
    return createScore(
      scoreType,
      SCORE.MEDIUM,
      ruleName,
      'Behavior issues within tolerance'
    );
  }

  const difference = behaviourIssues - adopterTolerance;

  // Pet having more issues than adopter tolerates
  if (difference >= 2) {
    return createScore(
      scoreType,
      SCORE.NEGATIVE,
      ruleName,
      'Behavior issues exceed tolerance significantly'
    );
  }

  return createScore(
    scoreType,
    SCORE.LOW,
    ruleName,
    'Behavior issues slightly exceed tolerance'
  );
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