-------------
-- SPECIES --
-------------
CREATE TABLE species (
  id TEXT PRIMARY KEY,
  norwegian_name TEXT,
  latin_name TEXT,

  size TEXT, -- small / medium / large / very_large
  noise_level TEXT, -- low / medium / high / very_high
  noise_frequency TEXT, -- occasional / daily / frequent

  activity_level TEXT,
  social_need TEXT,
  mental_stimulation_need TEXT,
  training_need TEXT,

  affection_level TEXT,
  diet_complexity TEXT,

  sleep_need_hours INT,
  requires_darkness_level TEXT,

  experience_level TEXT, -- beginner / intermediate / experienced / advanced
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

  origin TEXT, -- breeder / rehomed / found

  -- behavior
  tameness_level TEXT,
  handling_tolerance TEXT,
  human_trust_level TEXT,

  social_with_humans TEXT,
  social_with_birds TEXT,
  bonding_style TEXT,

  activity_level TEXT,
  stress_sensitivity TEXT,

  -- behavioral issues
  biting_risk TEXT,
  screaming_level TEXT,
  feather_plucking BOOLEAN,
  destructiveness TEXT,
  separation_anxiety TEXT,

  -- relationship
  desired_contact_level TEXT,
  affection_level TEXT,
  tolerates_children TEXT,
  tolerates_strangers TEXT,

  -- flock
  requires_bird_partner BOOLEAN,
  can_live_with_other_birds TEXT,
  compatibility_with_other_species TEXT,

  -- stimulation
  training_level TEXT,
  training_need TEXT,
  mental_stimulation_need TEXT,

  -- noise
  noise_level TEXT,
  screaming_time TEXT,
  noise_frequency TEXT
);

------------------------
-- HOUSEHOLD PROFILES --
------------------------
CREATE TABLE adopters (
  id TEXT PRIMARY KEY,

  -- GENERAL QUIZ
  space_level TEXT,
  household_type TEXT,
  kids_age TEXT,

  has_current_pets BOOLEAN,
  type_of_pet TEXT[], -- array

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

  rehome_responsibility_level TEXT,
  financial_priority TEXT,

  has_pet_experience BOOLEAN,
  learning_willingness TEXT,

  pet_experience_type TEXT[],
  experience_years_bird INT,

  -- preferences
  desired_pet_sociability TEXT,
  desired_pet_affection_level TEXT,
  problem_behavior_tolerance TEXT,

  -- BIRD QUIZ
  sleep_environment_commitment TEXT,
  free_flight_expectation TEXT,
  free_roaming_tolerance TEXT,

  mess_tolerance TEXT,
  destruction_tolerance TEXT,

  desired_human_interaction TEXT,
  desired_bonding_style TEXT,
  bird_over_human_acceptance TEXT,

  tameness_requirement TEXT,
  adoption_complexity_tolerance TEXT,

  willingness_multiple_birds TEXT,

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
  rule_type TEXT, -- welfare / human / hard_rule

  value INT,
  description TEXT
);