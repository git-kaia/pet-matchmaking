-- seed.sql
-- ============================================================
-- RESET TABLES (FOR CLEAN RE-RUNS)
-- ============================================================

TRUNCATE match_rule_results RESTART IDENTITY CASCADE;
TRUNCATE matches RESTART IDENTITY CASCADE;
TRUNCATE adopters CASCADE;
TRUNCATE birds CASCADE;

-- ============================================================
-- BIRDS
-- ============================================================

INSERT INTO birds VALUES

-- Easy social beginner bird
('social_beginner_budgie','budgie','Pip','bird','small',
 'low','high','medium',
 'beginner',10,
 60,'low','low',
 'medium','low','low',
 'flock',true,
 'medium',
 'medium','high',
 'low'),

-- Independent low-need bird
('independent_low_need_canary','canary','Sunny','bird','small',
 'low','low','low',
 'beginner',10,
 30,'low','low',
 'low','low','low',
 'independent',false,
 'low',
 'low','low',
 'low'),

-- Friendly balanced bird
('friendly_balanced_cockatiel','cockatiel','Koko','bird','medium',
 'medium','high','high',
 'beginner',20,
 90,'medium','low',
 'medium','low','low',
 'pair',false,
 'medium',
 'medium','medium',
 'medium'),

-- High demand intelligent bird
('high_needs_african_grey','african_grey','Athena','bird','large',
 'high','very_high','medium',
 'advanced',50,
 180,'high','high',
 'very_high','high','high',
 'one_person',false,
 'very_high',
 'high','high',
 'very_high'),

-- Very loud and social bird
('very_loud_social_conure','sun_conure','Rio','bird','medium',
 'very_high','very_high','medium',
 'experienced',30,
 150,'medium','medium',
 'high','medium','medium',
 'pair',true,
 'high',
 'medium','very_high',
 'medium'),

-- Behaviour risk case
('low_stability_budgie','budgie','Ghost','bird','small',
 'low','low','low',
 'beginner',10,
 45,'low','low',
 'low','high','high',
 'independent',false,
 'low',
 'low','low',
 'low'),

-- Balanced moderate bird
('moderate_balanced_cockatiel','cockatiel','Luna','bird','medium',
 'medium','medium','medium',
 'beginner',20,
 90,'medium','medium',
 'medium','low','medium',
 'pair',false,
 'medium',
 'medium','medium',
 'medium'),

-- Extreme intelligence + needs
('extreme_intelligence_grey','african_grey','Einstein','bird','large',
 'high','very_high','medium',
 'advanced',50,
 180,'high','high',
 'very_high','high','high',
 'one_person',false,
 'very_high',
 'high','high',
 'very_high'),

-- Chaotic high-social bird
('chaotic_high_social_conure','sun_conure','Chaos','bird','medium',
 'very_high','very_high','high',
 'experienced',30,
 150,'medium','medium',
 'high','high','high',
 'flock',true,
 'high',
 'medium','very_high',
 'medium'),

-- Minimal care control case
('minimal_care_canary','canary','Whisper','bird','small',
 'low','low','low',
 'beginner',10,
 30,'low','low',
 'low','low','low',
 'independent',false,
 'low',
 'low','low',
 'low');

-- ============================================================
-- ADOPTERS
-- ============================================================

INSERT INTO adopters VALUES

-- High risk: cat + low tolerance
('busy_cat_low_tolerance',
 'none',
 true, ARRAY['cat'],
 'full_time',
 60,'high',
 'low','low',
 'none',
 'low',5,
 'low','low',
 '{}'::jsonb,
 'low','low',
 'low',
 'low','low','low',
 'independent','low',
 'low',
 'low','low',
 'low',
 ARRAY[]::TEXT[]),

-- Ideal high-resource adopter
('ideal_experienced_bird_owner',
 'none',
 false, ARRAY[]::TEXT[],
 'part_time',
 240,'low',
 'high','high',
 'none',
 'high',30,
 'high','high',
 '{"bird":10}'::jsonb,
 'high','high',
 'high',
 'high','high','high',
 'one_person','high',
 'high',
 'high','high',
 'high',
 ARRAY[]::TEXT[]),

-- No time (guaranteed rejection)
('zero_time_unavailable',
 'none',
 false, ARRAY[]::TEXT[],
 'full_time',
 0,'high',
 'low','low',
 'none',
 'low',2,
 'low','low',
 '{}'::jsonb,
 'low','low',
 'low',
 'low','low','low',
 'independent','low',
 'low',
 'low','low',
 'low',
 ARRAY[]::TEXT[]),

-- Noise-sensitive household
('noise_sensitive_moderate_owner',
 'none',
 false, ARRAY[]::TEXT[],
 'part_time',
 120,'medium',
 'medium','low',
 'none',
 'medium',10,
 'medium','medium',
 '{"bird":2}'::jsonb,
 'medium','medium',
 'medium',
 'medium','medium','medium',
 'independent','medium',
 'medium',
 'medium','medium',
 'medium',
 ARRAY[]::TEXT[]),

-- Overconfident beginner
('overconfident_low_tolerance_beginner',
 'kids',
 false, ARRAY[]::TEXT[],
 'part_time',
 180,'low',
 'low','low',
 'none',
 'medium',10,
 'medium','low',
 '{}'::jsonb,
 'low','medium',
 'low',
 'medium','low','low',
 'independent','low',
 'low',
 'high','low',
 'low',
 ARRAY[]::TEXT[]);