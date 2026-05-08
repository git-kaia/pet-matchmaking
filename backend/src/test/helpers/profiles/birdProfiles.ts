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
  size: 'very_small',
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

  noiseLevel: 'very_high',

  socialNeed: 'very_high',
  affectionLevel: 'very_high',

  experienceLevel: 'advanced',

  lifespanYears: 40,

  timeRequired: 480,

  messLevel: 'high',
  financialBurden: 'high',

  careNeed: 'very_high',
  aggressionRisk: 'high',
  behaviourIssues: 'high',

  // ---- Bird-specific fields ----
  bondingStyle: 'one_person',

  requiresBirdPartner: false,

  mentalStimulationNeed: 'very_high',

  sleepNeed: 'high',

  flightNeed: 'high',

  dietComplexity: 'high',
});


/**
 * Low-maintenance, independent, low interaction bird
 */
export const lowMaintenanceIndependentBird: Bird = createTestBird({
  id: 'b3',
  speciesId: 'canary',

  // ---- Pet base fields ----
  size: 'very_small',
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

/**
 * Loud, socially demanding bird.
 * Designed to stress-test preference compatibility.
 */
export const loudSocialCockatoo: Bird = createTestBird({
  id: 'b4',
  speciesId: 'cockatoo',

  // ---- General ----
  size: 'large',

  noiseLevel: 'very_high',
  socialNeed: 'very_high',
  affectionLevel: 'very_high',

  experienceLevel: 'advanced',
  lifespanYears: 60,

  timeRequired: 360,

  messLevel: 'high',
  financialBurden: 'high',

  careNeed: 'very_high',
  aggressionRisk: 'high',
  behaviourIssues: 'high',

  // ---- Bird-specific ----
  bondingStyle: 'one_person',

  requiresBirdPartner: false,

  mentalStimulationNeed: 'very_high',

  sleepNeed: 'high',
  flightNeed: 'very_high',

  dietComplexity: 'high',
});


/**
 * Balanced companion bird.
 * Intended to produce moderate and varied scoring outcomes.
 */
export const balancedCompanionBird: Bird = createTestBird({
  id: 'b5',
  speciesId: 'conure',

  // General
  size: 'small',

  noiseLevel: 'high',
  socialNeed: 'medium',
  affectionLevel: 'medium',

  experienceLevel: 'intermediate',
  lifespanYears: 20,

  timeRequired: 90,

  messLevel: 'medium',
  financialBurden: 'medium',

  careNeed: 'medium',
  aggressionRisk: 'low',
  behaviourIssues: 'medium',

  // Bird-specific
  bondingStyle: 'multiple_people',

  requiresBirdPartner: false,

  mentalStimulationNeed: 'medium',

  sleepNeed: 'medium',
  flightNeed: 'medium',

  dietComplexity: 'medium',
});

export const birdProfiles: Bird[] = [
  socialBeginnerFriendlyBird,
  highMaintenanceDemandingBird,
  lowMaintenanceIndependentBird,
  loudSocialCockatoo,
  balancedCompanionBird,
];