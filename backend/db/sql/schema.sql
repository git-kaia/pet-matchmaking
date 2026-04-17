-- scema.sql
-------------
-- SPECIES --
-------------
CREATE TABLE species (
  id TEXT PRIMARY KEY,
  norwegian_name TEXT,
  latin_name TEXT,

  size TEXT,
  noise_level TEXT,
  noise_frequency TEXT,

  activity_level TEXT,
  social_need TEXT,
  mental_stimulation_need TEXT,
  training_need TEXT,

  affection_level TEXT,
  diet_complexity TEXT,

  experience_level TEXT,
  space_requirement TEXT,

  lifespan_years INT
);

----------------------
-- INDIVIDUAL BIRDS --
----------------------
CREATE TABLE birds (
  id TEXT PRIMARY KEY,
  species_id TEXT REFERENCES species(id),

  name TEXT,
  age_years INT,
  sex TEXT,
  origin TEXT,

  -- overrides (nullable = fallback to species)
  noise_level TEXT,
  activity_level TEXT,
  social_need TEXT,
  affection_level TEXT,

  -- behavior
  tameness_level TEXT,
  handling_tolerance TEXT,
  human_trust_level TEXT,

  social_with_humans TEXT,
  social_with_birds TEXT,
  bonding_style TEXT,

  stress_sensitivity TEXT,

  biting_risk TEXT,
  screaming_level TEXT,
  feather_plucking BOOLEAN,
  destructiveness TEXT,
  separation_anxiety TEXT,

  requires_bird_partner BOOLEAN,

  training_level TEXT,
  training_need TEXT,
  mental_stimulation_need TEXT
);
------------------------
-- HOUSEHOLD PROFILES --
------------------------
-- General quiz

CREATE TABLE adopters (
  id TEXT PRIMARY KEY,

  space_level TEXT,
  household_type TEXT,
  kids_age TEXT,

  has_current_pets BOOLEAN,
  current_pet_types TEXT[],

  household_noise_level TEXT,

  household_work_pattern TEXT,
  household_work_hours TEXT,

  daily_care_time INT,
  alone_time_hours TEXT,

  cleaning_tolerance TEXT,
  noise_tolerance_level TEXT,

  household_allergy_sensitivity TEXT,

  life_stability TEXT,
  commitment_horizon_years INT,

  financial_priority TEXT,

  has_pet_experience BOOLEAN,
  pet_experience_types TEXT[],

  learning_willingness TEXT,

  desired_pet_sociability TEXT,
  desired_pet_affection_level TEXT,

  problem_behavior_tolerance TEXT
);

-- Adopters bird quiz
CREATE TABLE adopter_bird_preferences (
  adopter_id TEXT PRIMARY KEY REFERENCES adopters(id),

  desired_human_interaction TEXT,
  desired_bonding_style TEXT,

  willingness_multiple_birds TEXT,

  free_flight_expectation TEXT,
  free_roaming_tolerance TEXT,

  mess_tolerance TEXT,
  destruction_tolerance TEXT,

  tameness_requirement TEXT,
  adoption_complexity_tolerance TEXT,

  noise_sensitivity_time TEXT,
  sudden_noise_tolerance TEXT,

  enrichment_commitment TEXT,
  training_interest TEXT,

  diet_complexity_tolerance TEXT
);

----------------------
-- MATCHING RESULTS --
----------------------
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,

  adopter_id TEXT REFERENCES adopters(id),
  bird_id TEXT REFERENCES birds(id),

  score INT,
  welfare_score INT,
  human_score INT,

  rejected BOOLEAN,
  rejection_reason TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-------------------
-- RULE TRACKING --
-------------------
-- (For debugging and improving the matching algorithm)
CREATE TABLE match_rule_results (
  id SERIAL PRIMARY KEY,

  match_id INT REFERENCES matches(id),

  rule_name TEXT,
  rule_type TEXT,
  value INT,
  description TEXT
);