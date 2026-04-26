import { Bird } from '../../../domain/entities/bird';

export const birdProfiles: Bird[] = [
  {
    id: 'b1',
    speciesId: 'budgie',
    animalType: 'bird',

    size: 'small',
    noiseLevel: 'low',
    activityLevel: 'high',
    socialNeed: 'high',
    affectionLevel: 'medium',

    experienceLevel: 'beginner',
    lifespanYears: 10,

    timeRequired: 120,
    messLevel: 'medium',
    financialBurden: 'low',

    careNeed: 'medium',
    aggressionRisk: 'low',
    behaviourIssues: 'low',

    // Bird specific
    socialWithHumans: 'high',
    socialWithBirds: 'high',
    bondingStyle: 'multiple_people',

    bitingRisk: 'low',
    screamingLevel: 'low',
    destructiveness: 'low',
    separationAnxiety: 'low',

    toleratesChildren: 'high',
    toleratesStrangers: 'medium',

    requiresBirdPartner: true,
    canLiveWithOtherBirds: 'high',

    trainingLevel: 'beginner',
    mentalStimulationNeed: 'medium',

    sleepNeed: 'medium',
    flightNeed: 'high',
  },

  {
    id: 'b4',
    speciesId: 'african_grey',
    animalType: 'bird',

    size: 'large',
    noiseLevel: 'high',
    activityLevel: 'medium',
    socialNeed: 'very_high',
    affectionLevel: 'medium',

    experienceLevel: 'advanced',
    lifespanYears: 50,

    timeRequired: 300,
    messLevel: 'high',
    financialBurden: 'high',

    careNeed: 'very_high',
    aggressionRisk: 'high',
    behaviourIssues: 'high',

    socialWithHumans: 'low',
    socialWithBirds: 'low',
    bondingStyle: 'one_person',

    bitingRisk: 'high',
    screamingLevel: 'high',
    destructiveness: 'high',
    separationAnxiety: 'high',

    toleratesChildren: 'low',
    toleratesStrangers: 'low',

    requiresBirdPartner: false,
    canLiveWithOtherBirds: 'low',

    trainingLevel: 'experienced',
    mentalStimulationNeed: 'very_high',

    sleepNeed: 'high',
    flightNeed: 'high',
  },

  {
    id: 'b2',
    speciesId: 'canary',
    animalType: 'bird',

    size: 'small',
    noiseLevel: 'low',
    activityLevel: 'low',
    socialNeed: 'low',
    affectionLevel: 'low',

    experienceLevel: 'beginner',
    lifespanYears: 10,

    timeRequired: 30,
    messLevel: 'low',
    financialBurden: 'low',

    careNeed: 'low',
    aggressionRisk: 'low',
    behaviourIssues: 'low',

    socialWithHumans: 'low',
    socialWithBirds: 'low',
    bondingStyle: 'independent',

    bitingRisk: 'low',
    screamingLevel: 'low',
    destructiveness: 'low',
    separationAnxiety: 'low',

    toleratesChildren: 'high',
    toleratesStrangers: 'high',

    requiresBirdPartner: false,
    canLiveWithOtherBirds: 'low',

    trainingLevel: 'beginner',
    mentalStimulationNeed: 'low',

    sleepNeed: 'low',
    flightNeed: 'low',
  }
];