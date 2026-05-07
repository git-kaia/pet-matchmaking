// birdProfiles.ts

import { createTestBird } from '../createTestBird';
import { Bird } from '../../../domain/entities/bird';

//////////////////////////////
// INDIVIDUAL BIRD PROFILES //
//////////////////////////////

/**
 * Social, beginner-friendly, moderate care bird
 */
export const socialBeginnerFriendlyBird: Bird = createTestBird({
  id: 'b1',
  speciesId: 'budgie',

  // ---- Pet base fields ----
  size: 'small',
  noiseLevel: 'low',
  socialNeed: 'high',

  timeRequired: 120,

  behaviourIssues: 'low',

  // ---- Bird-specific fields ----
  bondingStyle: 'multiple_people',

  requiresBirdPartner: true,

  flightNeed: 'high',
});


/**
 * Very demanding, high-maintenance, high-risk bird
 */
export const highMaintenanceDemandingBird: Bird = createTestBird({
  id: 'b2',
  speciesId: 'african_grey',

  // ---- Pet base fields ----
  size: 'large',
  noiseLevel: 'high',
  socialNeed: 'very_high',

  experienceLevel: 'advanced',
  lifespanYears: 50,

  timeRequired: 300,

  messLevel: 'high',
  financialBurden: 'high',

  careNeed: 'very_high',
  aggressionRisk: 'high',
  behaviourIssues: 'high',

  // ---- Bird-specific fields ----
  bondingStyle: 'one_person',
  mentalStimulationNeed: 'very_high',

  sleepNeed: 'high',
  flightNeed: 'high',
});


/**
 * Low-maintenance, independent, low interaction bird
 */
export const lowMaintenanceIndependentBird: Bird = createTestBird({
  id: 'b3',
  speciesId: 'canary',

  // ---- Pet base fields ----
  size: 'small',
  noiseLevel: 'low',
  socialNeed: 'low',
  affectionLevel: 'low',

  timeRequired: 30,

  messLevel: 'low',
  financialBurden: 'low',

  careNeed: 'low',
  behaviourIssues: 'low',

  // ---- Bird-specific fields ----
  bondingStyle: 'independent',

  mentalStimulationNeed: 'low',

  sleepNeed: 'low',
  flightNeed: 'low',
});

export const birdProfiles: Bird[] = [
  socialBeginnerFriendlyBird,
  highMaintenanceDemandingBird,
  lowMaintenanceIndependentBird,
];