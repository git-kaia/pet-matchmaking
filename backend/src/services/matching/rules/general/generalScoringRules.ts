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
import { RuleResult } from '../../types/matching.types';
import { Level } from '../../types/matching.types';

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
    return {
      scoreType,
      value: 10,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: 10,
        description: 'More than sufficient daily care time',
      },
    };
  }

  // Just enough time
  if (gap >= 0) {
    return {
      scoreType,
      value: 5,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: 5,
        description: 'Sufficient daily care time',
      },
    };
  }

  // Not enough time
  return {
    scoreType,
    value: -10,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: -10,
      description: 'Insufficient daily care time',
    },
  };
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
    return {
      scoreType,
      value: -10,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -10,
        description: 'High mismatch in noise tolerance',
      },
    };
  }

  if (d === 1) {
    return {
      scoreType,
      value: -5,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -5,
        description: 'Moderate mismatch in noise tolerance',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'Good noise compatibility',
    },
  };
};

// 03. Alone Time Risk
export const aloneTimeRiskRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'aloneTimeRisk' as const;

  const { aloneTimeHours } = ctx.adopter;
  const { socialNeed } = ctx.pet;

  if (aloneTimeHours === 'high' && isHigh(socialNeed)) {
    return {
      scoreType,
      value: -10,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -10,
        description: 'High alone time with highly social pet',
      },
    };
  }

  if (aloneTimeHours === 'medium' && isHigh(socialNeed)) {
    return {
      scoreType,
      value: -5,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -5,
        description: 'Moderate alone time with social pet',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'Alone time acceptable',
    },
  };
};

// 04. Life Stability
export const lifeStabilityRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'lifeStability' as const;

  const { lifeStability } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  if (lifeStability === 'low' && lifespanYears >= 20) {
    return {
      scoreType,
      value: -8,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -8,
        description: 'Low life stability for long-lived pet',
      },
    };
  }

  if (lifeStability === 'medium' && lifespanYears >= 30) {
    return {
      scoreType,
      value: -4,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -4,
        description: 'Moderate stability for very long-lived pet',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'Life stability sufficient',
    },
  };
};

// 05. Commitment vs Lifespan
export const commitmentRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'commitmentVsLifespan' as const;

  const { commitmentHorizonYears } = ctx.adopter;
  const { lifespanYears } = ctx.pet;

  if (!commitmentHorizonYears) {
    return {
      scoreType,
      value: 0,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: 0,
        description: 'No commitment data',
      },
    };
  }

  if (commitmentHorizonYears < lifespanYears * 0.5) {
    return {
      scoreType,
      value: -10,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -10,
        description: 'Very low commitment vs lifespan',
      },
    };
  }

  if (commitmentHorizonYears < lifespanYears) {
    return {
      scoreType,
      value: -5,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -5,
        description: 'Moderate commitment mismatch',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'Commitment sufficient',
    },
  };
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
    return {
      scoreType,
      value: -8,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -8,
        description: 'Adopter experience significantly underqualified for pet',
      },
    };
  }

  // Mild mismatch
  if (gap === -1) {
    return {
      scoreType,
      value: -5,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -5,
        description: 'Adopter experience slightly underqualified',
      },
    };
  }

  // Good match or overqualified
  return {
    scoreType,
    value: 2,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 2,
      description: 'Experience matches or exceeds requirement',
    },
  };
};

// 07. Learning Willingness
export const learningWillingnessRule: ScoringRule = (ctx) => {
  const scoreType = 'welfare' as const;
  const ruleName = 'learningWillingness' as const;

  const { hasPetExperience, learningWillingness } = ctx.adopter;

  if (!hasPetExperience && learningWillingness === 'high') {
    return {
      scoreType,
      value: 6,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: 6,
        description: 'High willingness to learn',
      },
    };
  }

  if (!hasPetExperience && learningWillingness === 'medium') {
    return {
      scoreType,
      value: 3,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: 3,
        description: 'Moderate willingness to learn',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'No learning bonus',
    },
  };
};

// 08. Cleaning Tolerance
export const cleaningToleranceRule: ScoringRule = (ctx) => {
  const scoreType = 'human' as const;
  const ruleName = 'cleaningTolerance' as const;

  const { cleaningTolerance } = ctx.adopter;
  const { messLevel } = ctx.pet;

  if (cleaningTolerance === 'low' && isHigh(messLevel)) {
    return {
      scoreType,
      value: -6,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -6,
        description: 'Low cleaning tolerance for active pet',
      },
    };
  }

  if (cleaningTolerance === 'medium' && isHigh(messLevel)) {
    return {
      scoreType,
      value: -3,
      rule: {
        ruleName,
        ruleType: scoreType,
        value: -3,
        description: 'Moderate cleaning mismatch',
      },
    };
  }

  return {
    scoreType,
    value: 0,
    rule: {
      ruleName,
      ruleType: scoreType,
      value: 0,
      description: 'Cleaning tolerance acceptable',
    },
  };
};

///////////////////////
// Rule exports     //
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
];