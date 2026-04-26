// scoring.utils.ts

import { Level, Level3 } from '../../../domain/types/common.types';
import { distanceMixed } from './level.utils';

/////////////////////////////
// SCORE CONSTANTS         //
/////////////////////////////

export const SCORE = {
  HIGH: 10,
  MEDIUM: 5,
  LOW: 0,
  NEGATIVE: -5,
  CRITICAL: -10,
} as const;

/////////////////////////////
// SCORE FACTORY           //
/////////////////////////////

export const createScore = (
  scoreType: 'welfare' | 'human',
  value: number,
  ruleName: string,
  description: string
) => ({
  scoreType,
  value,
  rule: { ruleName, description },
});
