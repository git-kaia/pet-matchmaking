-- seed.sql
-- ============================================================
-- RESET TABLES (FOR CLEAN RE-RUNS)
-- ============================================================

TRUNCATE match_rule_results RESTART IDENTITY CASCADE;
TRUNCATE matches RESTART IDENTITY CASCADE;
TRUNCATE adopter_bird_preferences CASCADE;
TRUNCATE adopters CASCADE;
TRUNCATE birds CASCADE;
TRUNCATE species CASCADE;


-- ============================================================
-- SPECIES (BASELINE TRAITS)
-- These represent "typical" characteristics of a species
-- Used as defaults in matching logic
-- ============================================================

INSERT INTO species VALUES

-- Beginner, low noise, social
('budgie', 'Undulat', 'Melopsittacus undulatus',
 'small','low','frequent',
 'high','high','medium','low',
 'medium','low',
 'beginner','small',
 10,
 true,'high','medium'),

-- Calm, friendly, beginner-friendly
('cockatiel','Nymfekakadue','Nymphicus hollandicus',
 'medium','medium','daily',
 'medium','high','medium','medium',
 'high','low',
 'beginner','medium',
 20,
 false,'medium','medium'),

-- Intelligent, demanding, long lifespan
('african_grey','Grå jako','Psittacus erithacus',
 'large','high','daily',
 'medium','very_high','very_high','high',
 'medium','high',
 'advanced','large',
 50,
 false,'high','high'),

-- Very loud, very social, high energy
('sun_conure','Solparakitt','Aratinga solstitialis',
 'medium','very_high','frequent',
 'very_high','very_high','very_high','high',
 'medium','medium',
 'experienced','large',
 30,
 true,'very_high','medium'),

-- Very easy, quiet, low interaction
('canary','Kanari','Serinus canaria',
 'small','low','daily',
 'low','low','low','low',
 'low','low',
 'beginner','small',
 10,
 false,'low','low');


-- ============================================================
-- BIRDS (INDIVIDUAL ANIMALS)
-- These may override species traits (NULL = inherit)
-- Used to simulate real-world variation
-- ============================================================

INSERT INTO birds VALUES

-- EASY / BEGINNER BIRDS
('b1','budgie','Pip',2,'male','rehomed',
 NULL,NULL,NULL,NULL,
 'medium','medium','medium',
 'high','high','flock','low',
 'low','low',false,'low','low',
 true,
 'low','low','medium',
 'high','medium','high'),

-- LOW BEED / INDEPENDENT
('b2','canary','Sunny',1,'female','breeder',
 NULL,NULL,NULL,NULL,
 'low','low','low',
 'low','low','independent','low',
 'low','low',false,'low','low',
 false,
 'low','low','low',
 'low','low','low'),

-- SOCIAL & FRIENDLY
('b3','cockatiel','Koko',3,'female','breeder',
 NULL,NULL,NULL,NULL,
 'high','high','high',
 'high','medium','pair','medium',
 'low','medium',false,'low','low',
 false,
 'medium','medium','medium',
 'medium','medium','medium'),

-- VERY DEMANDING (HIGH RISK MATCH)
('b4','african_grey','Athena',8,'female','rehomed',
 NULL,NULL,NULL,NULL,
 'low','low','medium',
 'very_high','low','one_person','high',
 'high','high',true,'high','high',
 false,
 'high','high','very_high',
 'high','high','very_high'),

-- EXTREME NOISE BIRD
('b5','sun_conure','Rio',4,'male','rehomed',
 NULL,NULL,NULL,NULL,
 'medium','medium','medium',
 'very_high','medium','pair','medium',
 'medium','very_high',false,'medium','medium',
 true,
 'high','high','high',
 'very_high','medium','very_high'),

-- EDGE CASES (CHALLENGING)
('b6','budgie','Ghost',5,'male','rehomed',
 NULL,NULL,NULL,NULL,
 'low','low','low',
 'low','low','independent','high',
 'high','low',true,'high','high',
 false,
 'low','low','low',
 'low','high','high'),

-- BALANCED
('b7','cockatiel','Luna',2,'female','breeder',
 NULL,NULL,NULL,NULL,
 'medium','medium','medium',
 'medium','medium','pair','low',
 'low','medium',false,'low','low',
 false,
 'medium','medium','medium',
 'medium','medium','medium'),

-- HIGH INTELLIGENCE / DEMANDING
('b8','african_grey','Einstein',12,'male','rehomed',
 NULL,NULL,NULL,NULL,
 'high','high','high',
 'very_high','low','one_person','high',
 'high','high',true,'high','high',
 false,
 'high','high','very_high',
 'high','high','very_high'),

-- CHAOTIC / VERY SOCIAL
('b9','sun_conure','Chaos',3,'male','rehomed',
 NULL,NULL,NULL,NULL,
 'medium','medium','medium',
 'very_high','high','flock','high',
 'high','very_high',true,'high','high',
 true,
 'high','high','high',
 'very_high','medium','very_high'),

-- VERY LOW NEED (CONTROL CASE)
('b10','canary','Whisper',1,'female','breeder',
 NULL,NULL,NULL,NULL,
 'low','low','low',
 'low','low','independent','low',
 'low','low',false,'low','low',
 false,
 'low','low','low',
 'low','low','low');



-- ============================================================
-- ADOPTERS (GENERAL QUIZ DATA)
-- Represents household + lifestyle
-- Used in ALL matching
-- ============================================================

INSERT INTO adopters VALUES

-- BAD MATCH (low time + cat)
('busy_cat_owner',
 'medium','couple','none',
 true, ARRAY['cat'],
 'medium',
 'full_time','day_shift',
 60,'high',
 'low','low',
 'none',
 'low',5,
 'low',
 true,ARRAY['cat'],
 'low',
 'low','low',
 'low',

 'low','low','low','low','low'),

-- IDEAL MATCH (high resources)
('experienced_bird_keeper',
 'large','single','none',
 false,ARRAY[]::TEXT[],
 'low',
 'part_time','day_shift',
 240,'low',
 'high','high',
 'none',
 'high',30,
 'high',
 true,ARRAY['bird'],
 'high',
 'high','high',
 'high',

 'high','high','high','high','high'),

-- SHOULD BE REJECTED (no time)
('no_time_user',
 'small','single','none',
 false,ARRAY[]::TEXT[],
 'low',
 'full_time','day_shift',
 0,'high',
 'low','low',
 'none',
 'low',2,
 'low',
 false,ARRAY[]::TEXT[],
 'low',
 'low','low',
 'low',

 'low','low','low','low','low'),

-- LOW NOISE TOLERANCE USER
('noise_sensitive_user',
 'small','single','none',
 false,ARRAY[]::TEXT[],
 'low',
 'part_time','day_shift',
 120,'medium',
 'medium','low',
 'none',
 'medium',10,
 'medium',
 true,ARRAY['bird'],
 'medium',
 'medium','medium',
 'medium',

 'low','medium','medium','medium','medium'),

-- HIGH TIME BUT LOW TOLERANCE (edge case)
('overconfident_beginner',
 'large','family','kids',
 false,ARRAY[]::TEXT[],
 'high',
 'part_time','day_shift',
 180,'low',
 'low','low',
 'none',
 'medium',10,
 'medium',
 false,ARRAY[]::TEXT[],
 'low',
 'medium','low',
 'low',

 'low','high','low','low','low');


-- ============================================================
-- ADOPTER BIRD PREFERENCES (BIRD QUIZ)
-- Only used for bird-specific rules
-- ============================================================

INSERT INTO adopter_bird_preferences VALUES

-- LOW ENGAGEMENT USER
('busy_cat_owner',
 'low','independent',
 'low',
 'low','low',
 'low','low',
 'low','low',
 'none','low',
 'low','low',
 'low'),

-- IDEAL USER
('experienced_bird_keeper',
 'high','one_person',
 'high',
 'high','high',
 'high','high',
 'high','high',
 'none','high',
 'high','high',
 'high'),

-- LOW COMMITMENT USER
('no_time_user',
 'low','independent',
 'low',
 'low','low',
 'low','low',
 'low','low',
 'none','low',
 'low','low',
 'low'),

-- NOISE SENSITIVE USER
('noise_sensitive_user',
 'medium','independent',
 'low',
 'medium','medium',
 'medium','medium',
 'medium','medium',
 'morning','low',
 'medium','medium',
 'medium');