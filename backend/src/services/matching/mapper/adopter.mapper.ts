import { Adopter } from '../types/matching.types';

export const mapAdopterFromDB = (row: any): Adopter => {
  return {
    id: row.id,

    daily_care_time: row.daily_care_time,

    household_allergy_sensitivity: row.household_allergy_sensitivity,
    specific_animal_allergies: [], // ← your DB currently doesn’t support this yet

    alone_time_hours: row.alone_time_hours,

    noise_tolerance_level: row.noise_tolerance_level,
    cleaning_tolerance: row.cleaning_tolerance,

    life_stability: row.life_stability,
    commitment_horizon_years: row.commitment_horizon_years,

    has_pet_experience: row.has_pet_experience,
    experience_years: {
      bird: row.experience_years_bird,
    },

    desired_pet_sociability: row.desired_pet_sociability,
    desired_pet_affection_level: row.desired_pet_affection_level,

    problem_behavior_tolerance: row.problem_behavior_tolerance,
  };
};