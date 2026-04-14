// matching.types.ts
// Types for matching
// Used by rules, scoring and matching logic

export type Level = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

///////////////////////////////////////////////////////////////

export type Pet = {
  id: string;

  size: 'small' | 'medium' | 'large' | 'very_large';

  noise_level: Level;
  activity_level: Level;
  social_need: Level;
  affection_level: Level;

  experience_level: 'beginner' | 'intermediate' | 'experienced' | 'advanced';

  lifespan_years: number;

  // generic needs (used in general logic)
  care_need?: Level;
  diet_complexity?: Level;
  aggression_risk?: 'low' | 'medium' | 'high';
};

/////////////////////////////////////////////////////////////

export type Bird = {
  id: string;

  size: 'small' | 'medium' | 'large' | 'very_large';

  noise_level: Level;
  activity_level: Level;

  social_need: Level;
  affection_level: Level;

  experience_level: 'beginner' | 'intermediate' | 'experienced' | 'advanced';

  lifespan_years: number;

  requires_bird_partner: boolean;
};

////////////////////////////////////////////////////////////

export type Adopter = {
  id: string;

  daily_care_time: number;

  // keep 3-level (represents time buckets, not intensity)
  alone_time_hours: 'low' | 'medium' | 'high';

  noise_tolerance_level: Level;
  cleaning_tolerance: 'low' | 'medium' | 'high';

  life_stability: 'low' | 'medium' | 'high';
  commitment_horizon_years: number;

  has_pet_experience: boolean;
  experience_years_bird: number;

  desired_pet_sociability: Level;
  desired_pet_affection_level: Level;

  problem_behavior_tolerance: 'low' | 'medium' | 'high';
};

////////////////////////////////////////////////////////////

export type MatchResult = {
  bird_id: string;

  score: number;
  welfare_score: number;
  human_score: number;

  rejected: boolean;
  rejection_reason?: string;
};

/////////////////////////////////////////////////////////////

export type RuleResult = {
  rule_name: string;
  rule_type: 'hard_rule' | 'welfare' | 'human';

  value: number;
  description: string;
};

////////////////////////////////////////////////////////////

export type MatchingContext = {
  adopter: Adopter;
  pet: Pet;
};