-- scema.sql

----------------------
-- INDIVIDUAL BIRDS --
----------------------
CREATE TABLE birds (
  id TEXT PRIMARY KEY,
  species_id TEXT NOT NULL,
  name TEXT NOT NULL,
  -- Pet core
  animal_type TEXT NOT NULL DEFAULT 'bird',

  size TEXT NOT NULL,

  noise_level TEXT NOT NULL,
  social_need TEXT NOT NULL,
  affection_level TEXT NOT NULL,

  experience_level TEXT NOT NULL,
  lifespan_years INT NOT NULL,

  time_required INT NOT NULL,
  mess_level TEXT NOT NULL,
  financial_burden TEXT NOT NULL,

  care_need TEXT NOT NULL,
  aggression_risk TEXT NOT NULL,
  behaviour_issues TEXT NOT NULL,

  -- Bird-specific
  bonding_style TEXT NOT NULL,
  requires_bird_partner BOOLEAN NOT NULL,

  mental_stimulation_need TEXT NOT NULL,

  sleep_need TEXT NOT NULL,
  flight_need TEXT NOT NULL,

  diet_complexity TEXT NOT NULL
);
------------------------
-- HOUSEHOLD PROFILES --
------------------------
CREATE TABLE adopters (
  id TEXT PRIMARY KEY,

  -- Household
  kids_age TEXT NOT NULL,

  has_current_pets BOOLEAN NOT NULL,
  type_of_pet TEXT[] NOT NULL,

  household_work_pattern TEXT NOT NULL,

  -- Core inputs
  daily_care_time INT NOT NULL,
  alone_time_hours TEXT NOT NULL,

  cleaning_tolerance TEXT NOT NULL,
  noise_tolerance_level TEXT NOT NULL,

  household_allergy_sensitivity TEXT NOT NULL,

  life_stability TEXT NOT NULL,
  commitment_horizon_years INT NOT NULL,

  financial_priority TEXT NOT NULL,
  learning_willingness TEXT NOT NULL,

  experience_years JSONB NOT NULL,

  desired_pet_sociability TEXT NOT NULL,
  desired_pet_affection_level TEXT NOT NULL,

  problem_behavior_tolerance TEXT NOT NULL,

  -- Bird-specific
  desired_human_interaction TEXT NOT NULL,
  sleep_environment_commitment TEXT NOT NULL,
  free_flight_expectation TEXT NOT NULL,

  desired_bonding_style TEXT NOT NULL,
  adoption_complexity_tolerance TEXT NOT NULL,

  willingness_multiple_birds TEXT NOT NULL,

  enrichment_commitment TEXT NOT NULL,
  training_interest TEXT NOT NULL,

  diet_complexity_tolerance TEXT NOT NULL,

  specific_animal_allergies TEXT[] NOT NULL
);

----------------------
-- MATCHING RESULTS --
----------------------
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,

  adopter_id TEXT REFERENCES adopters(id),
  bird_id TEXT REFERENCES birds(id),

  score INT,
  percentage INT,
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
  description TEXT,

  rejected BOOLEAN,           
  reason TEXT                  
);