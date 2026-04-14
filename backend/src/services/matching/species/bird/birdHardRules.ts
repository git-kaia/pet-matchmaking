// birdHardRules.ts

import { MatchingContext } from '../../types';

export const isRejected = (ctx: MatchingContext): boolean => {
  const { adopter, bird } = ctx;

  // Bird needs companion but adopter not willing (simplified)
  if (bird.requires_bird_partner && adopter.alone_time_hours === 'high') {
    return true;
  }

  return false;
};