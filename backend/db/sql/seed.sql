-- ============================================================
-- SPECIES
-- ============================================================

INSERT INTO species (
  id, norwegian_name, latin_name,
  size, noise_level, noise_frequency,
  activity_level, social_need, mental_stimulation_need, training_need,
  affection_level, diet_complexity,
  sleep_need_hours, requires_darkness_level,
  experience_level, space_requirement,
  lifespan_years
)
VALUES
('budgie', 'Undulat', 'Melopsittacus undulatus',
 'small', 'low', 'frequent',
 'high', 'high', 'medium', 'low',
 'medium', 'low',
 12, 'medium',
 'beginner', 'small',
 10),

('sun_conure', 'Solparakitt', 'Aratinga solstitialis',
 'medium', 'very_high', 'frequent',
 'very_high', 'very_high', 'very_high', 'high',
 'medium', 'medium',
 12, 'high',
 'experienced', 'large',
 30),

('cockatiel', 'Nymfekakadue', 'Nymphicus hollandicus',
 'medium', 'medium', 'daily',
 'medium', 'high', 'medium', 'medium',
 'high', 'low',
 12, 'medium',
 'beginner', 'medium',
 20),

('african_grey', 'Grå jako', 'Psittacus erithacus',
 'large', 'high', 'daily',
 'medium', 'very_high', 'very_high', 'high',
 'medium', 'high',
 14, 'high',
 'advanced', 'large',
 50);

-- ============================================================
-- BIRDS
-- ============================================================

INSERT INTO birds (
  id, species_id,
  name, age_years, sex,
  origin,

  tameness_level, handling_tolerance, human_trust_level,
  social_with_humans, social_with_birds, bonding_style,
  activity_level, stress_sensitivity,

  biting_risk, screaming_level, feather_plucking, destructiveness, separation_anxiety,

  desired_contact_level, affection_level, tolerates_children, tolerates_strangers,

  requires_bird_partner, can_live_with_other_birds, compatibility_with_other_species,

  training_level, training_need, mental_stimulation_need,

  noise_level, screaming_time, noise_frequency
)
VALUES
('bird_1', 'budgie',
 'Pip', 2, 'male',
 'rehomed',

 'medium', 'medium', 'medium',
 'high', 'high', 'flock',
 'high', 'low',

 'low', 'low', false, 'low', 'low',

 'medium', 'medium', 'yes', 'yes',

 true, 'good', 'medium',

 'low', 'low', 'medium',

 'low', 'daytime', 'frequent'),

('bird_2', 'cockatiel',
 'Koko', 3, 'female',
 'breeder',

 'high', 'high', 'high',
 'high', 'medium', 'pair',
 'medium', 'medium',

 'low', 'medium', false, 'low', 'low',

 'high', 'high', 'yes', 'yes',

 false, 'good', 'good',

 'medium', 'medium', 'medium',

 'medium', 'morning_evening', 'daily'),

('bird_3', 'african_grey',
 'Athena', 8, 'female',
 'rehomed',

 'low', 'low', 'medium',
 'very_high', 'low', 'one_person',
 'medium', 'high',

 'high', 'high', true, 'high', 'high',

 'high', 'medium', 'no', 'no',

 false, 'limited', 'low',

 'high', 'high', 'very_high',

 'high', 'daytime', 'daily');

-- ============================================================
-- ADOPTERS
-- ============================================================

INSERT INTO adopters (
  id,
  space_level, household_type, kids_age,
  has_current_pets, type_of_pet,
  household_noise_level,
  household_work_pattern, household_work_hours,
  daily_care_time, alone_time_hours,
  cleaning_tolerance, noise_tolerance_level,
  household_allergy_sensitivity,
  life_stability, commitment_horizon_years,
  rehome_responsibility_level, financial_priority,
  has_pet_experience, learning_willingness,
  pet_experience_type, experience_years_bird,
  desired_pet_sociability, desired_pet_affection_level, problem_behavior_tolerance,

  sleep_environment_commitment, free_flight_expectation, free_roaming_tolerance,
  mess_tolerance, destruction_tolerance,
  desired_human_interaction, desired_bonding_style, bird_over_human_acceptance,
  tameness_requirement, adoption_complexity_tolerance,
  willingness_multiple_birds,
  noise_sensitivity_time, sudden_noise_tolerance,
  enrichment_commitment, training_interest,
  diet_complexity_tolerance
)
VALUES
('adopter_1',
 'medium', 'couple', 'none',
 true, ARRAY['cat'],
 'medium',
 'full_time', 'daytime',
 120, 'medium',
 'medium', 'medium',
 'none',
 'high', 10,
 'medium', 'medium',
 true, 'high',
 ARRAY['cat'], 2,
 'medium', 'medium', 'medium',

 'medium', 'medium', 'medium',
 'medium', 'medium',
 'medium', 'flexible', 'medium',
 'medium', 'medium',
 'low',
 'none', 'medium',
 'high', 'medium',
 'medium'),

('adopter_2',
 'small', 'single', 'none',
 false, ARRAY[]::TEXT[],
 'low',
 'part_time', 'daytime',
 60, 'low',
 'medium', 'low',
 'mild',
 'medium', 5,
 'low', 'low',
 true, 'medium',
 ARRAY['bird'], 1,
 'high', 'high', 'low',

 'high', 'low', 'low',
 'medium', 'low',
 'high', 'one_person', 'low',
 'low', 'low',
 'medium',
 'morning', 'low',
 'medium', 'low',
 'low');