import { Adopter } from '../models/adopter/adopter.model';

export const normalizeQuizToAdopter = (quiz: any): Adopter => {
  return {
    id: crypto.randomUUID(),

    // GENERAL
    spaceLevel: quiz.general.spaceLevel,
    householdType: quiz.general.householdType,
    kidsAge: quiz.general.kidsAge || 'none',

    hasCurrentPets: quiz.general.hasCurrentPets,
    typeOfPet: quiz.general.typeOfPet || [],

    householdNoiseLevel: quiz.general.householdNoiseLevel,

    householdWorkPattern: quiz.general.householdWorkPattern,
    householdWorkHours: quiz.general.householdWorkHours,

    dailyCareTime: quiz.general.dailyCareTime,
    aloneTimeHours: quiz.general.aloneTimeHours,

    cleaningTolerance: quiz.general.cleaningTolerance,
    noiseToleranceLevel: quiz.general.noiseToleranceLevel,

    // BIRD
    tamenessRequirement: quiz.bird.tamenessRequirement,
    desiredBondingStyle: quiz.bird.desiredBondingStyle,
    birdOverHumanAcceptance: quiz.bird.birdOverHumanAcceptance,

    noiseSensitivityTime: quiz.bird.noiseSensitivityTime,
    suddenNoiseTolerance: quiz.bird.suddenNoiseTolerance,

    enrichmentCommitment: quiz.bird.enrichmentCommitment,
    trainingInterest: quiz.bird.trainingInterest,

    dietComplexityTolerance: quiz.bird.dietComplexityTolerance,

    // DEFAULTS
    lifeStability: 'medium',
    commitmentHorizonYears: 5,
    rehomeResponsibilityLevel: 'medium',
    financialPriority: 'medium',
    hasPetExperience: false,
    learningWillingness: 'medium',
    petExperienceType: [],
    experienceYearsBird: 0,
    desiredPetSociability: 'medium',
    desiredPetAffectionLevel: 'medium',
    problemBehaviorTolerance: 'medium',
    sleepEnvironmentCommitment: 'medium',
    freeFlightExpectation: 'medium',
    freeRoamingTolerance: 'medium',
    messTolerance: 'medium',
    destructionTolerance: 'medium',
    desiredHumanInteraction: 'medium',
    tamenessRequirement: quiz.bird.tamenessRequirement,
    adoptionComplexityTolerance: 'medium',
    willingnessMultipleBirds: 'medium'
  };
};