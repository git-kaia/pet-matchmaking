import { Adopter } from '../../../domain/entities/adopter';

export const adopterProfiles: Adopter[] = [
  {
    id: 'busy_cat_owner',

    spaceLevel: 'medium',
    householdType: 'couple',
    kidsAge: 'none',

    hasCurrentPets: true,
    typeOfPet: ['cat'],

    householdNoiseLevel: 'medium',

    householdWorkPattern: 'full_time',
    householdWorkHours: 'day',

    dailyCareTime: 60,
    aloneTimeHours: 'high',

    cleaningTolerance: 'low',
    noiseToleranceLevel: 'low',

    householdAllergySensitivity: 'none',

    lifeStability: 'low',
    commitmentHorizonYears: 5,

    rehomeResponsibilityLevel: 'low',
    financialPriority: 'low',

    hasPetExperience: true,
    learningWillingness: 'low',

    experienceYears: { cat: 5 },

    desiredPetSociability: 'low',
    desiredPetAffectionLevel: 'low',
    desiredHumanInteraction: 'low',

    problemBehaviorTolerance: 'low',

    sleepEnvironmentCommitment: 'low',
    freeFlightExpectation: 'low',
    freeRoamingTolerance: 'low',

    messTolerance: 'low',
    destructionTolerance: 'low',

    desiredBondingStyle: 'independent',
    birdOverHumanAcceptance: 'low',

    tamenessRequirement: 'low',
    adoptionComplexityTolerance: 'low',

    willingnessMultipleBirds: 'low',

    noiseSensitivityTime: 'low',
    suddenNoiseTolerance: 'low',

    enrichmentCommitment: 'low',
    trainingInterest: 'low',

    dietComplexityTolerance: 'low',

    specificAnimalAllergies: [],
  },

  {
    id: 'experienced_bird_keeper',

    spaceLevel: 'high',
    householdType: 'single',
    kidsAge: 'none',

    hasCurrentPets: false,
    typeOfPet: [],

    householdNoiseLevel: 'low',

    householdWorkPattern: 'part_time',
    householdWorkHours: 'day',

    dailyCareTime: 240,
    aloneTimeHours: 'low',

    cleaningTolerance: 'high',
    noiseToleranceLevel: 'high',

    householdAllergySensitivity: 'none',

    lifeStability: 'high',
    commitmentHorizonYears: 30,

    rehomeResponsibilityLevel: 'high',
    financialPriority: 'high',

    hasPetExperience: true,
    learningWillingness: 'high',

    experienceYears: { bird: 10 },

    desiredPetSociability: 'high',
    desiredPetAffectionLevel: 'high',
    desiredHumanInteraction: 'high',

    problemBehaviorTolerance: 'high',

    sleepEnvironmentCommitment: 'high',
    freeFlightExpectation: 'high',
    freeRoamingTolerance: 'high',

    messTolerance: 'high',
    destructionTolerance: 'high',

    desiredBondingStyle: 'one_person',
    birdOverHumanAcceptance: 'high',

    tamenessRequirement: 'high',
    adoptionComplexityTolerance: 'high',

    willingnessMultipleBirds: 'high',

    noiseSensitivityTime: 'low',
    suddenNoiseTolerance: 'high',

    enrichmentCommitment: 'high',
    trainingInterest: 'high',

    dietComplexityTolerance: 'high',

    specificAnimalAllergies: [],
  },

  {
    id: 'no_time_user',

    spaceLevel: 'low',
    householdType: 'single',
    kidsAge: 'none',

    hasCurrentPets: false,
    typeOfPet: [],

    householdNoiseLevel: 'low',

    householdWorkPattern: 'full_time',
    householdWorkHours: 'day',

    dailyCareTime: 0,
    aloneTimeHours: 'high',

    cleaningTolerance: 'low',
    noiseToleranceLevel: 'low',

    householdAllergySensitivity: 'none',

    lifeStability: 'low',
    commitmentHorizonYears: 2,

    rehomeResponsibilityLevel: 'low',
    financialPriority: 'low',

    hasPetExperience: false,
    learningWillingness: 'low',

    experienceYears: {},

    desiredPetSociability: 'low',
    desiredPetAffectionLevel: 'low',
    desiredHumanInteraction: 'low',

    problemBehaviorTolerance: 'low',

    sleepEnvironmentCommitment: 'low',
    freeFlightExpectation: 'low',
    freeRoamingTolerance: 'low',

    messTolerance: 'low',
    destructionTolerance: 'low',

    desiredBondingStyle: 'independent',
    birdOverHumanAcceptance: 'low',

    tamenessRequirement: 'low',
    adoptionComplexityTolerance: 'low',

    willingnessMultipleBirds: 'low',

    noiseSensitivityTime: 'low',
    suddenNoiseTolerance: 'low',

    enrichmentCommitment: 'low',
    trainingInterest: 'low',

    dietComplexityTolerance: 'low',

    specificAnimalAllergies: [],
  }
];