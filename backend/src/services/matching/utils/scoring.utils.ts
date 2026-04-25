// scoring.utils.ts

import { Level, Level3 } from '../../../domain/types/common.types';
import { distanceMixed, scoreFromDistance, describeDistance } from './level.utils';

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

/////////////////////////////
// DISTANCE SCORE HELPER   //
/////////////////////////////

type CreateDistanceScoreParams = {
  scoreType: 'welfare' | 'human';
  ruleName: string;
  label: string;
  a: Level | Level3;
  b: Level | Level3;

  // Optional overrides
  valueFn?: (d: number) => number;
  descriptionFn?: (d: number) => string;
};

export const createDistanceScore = ({
  scoreType,
  ruleName,
  label,
  a,
  b,
  valueFn = scoreFromDistance,
  descriptionFn,
}: CreateDistanceScoreParams) => {
  const d = distanceMixed(a, b);

  const value = valueFn(d);
  const description =
    descriptionFn?.(d) ?? describeDistance(d, label);

  return createScore(scoreType, value, ruleName, description);
};