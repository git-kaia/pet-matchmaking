-- seed.sql
-- ============================================================
-- RESET TABLES
-- ============================================================

TRUNCATE match_rule_results RESTART IDENTITY CASCADE;
TRUNCATE matches RESTART IDENTITY CASCADE;
TRUNCATE adopters CASCADE;
TRUNCATE birds CASCADE;

-- ============================================================
-- BIRDS
-- ============================================================

INSERT INTO birds VALUES

-- ============================================================
-- Social Beginner-Friendly Budgie
-- ============================================================

(
'social_beginner_budgie',
'budgie',
'Pip',
'bird',

'very_small',

'low',
'high',
'medium',

'beginner',
10,

120,

'low',
'low',

'medium',
'low',
'low',

'multiple_people',

true,

'medium',

'medium',
'high',

'medium'
),

-- ============================================================
-- High-Maintenance African Grey
-- ============================================================

(
'high_maintenance_african_grey',
'african_grey',
'Athena',
'bird',

'large',

'very_high',
'very_high',
'very_high',

'advanced',
40,

480,

'high',
'high',

'very_high',
'high',
'high',

'one_person',

false,

'very_high',

'high',
'high',

'high'
),

-- ============================================================
-- Low-Maintenance Independent Canary
-- ============================================================

(
'low_maintenance_independent_canary',
'canary',
'Sunny',
'bird',

'very_small',

'low',
'low',
'low',

'beginner',
15,

30,

'low',
'low',

'low',
'low',
'low',

'independent',

false,

'low',

'low',
'low',

'low'
),

-- ============================================================
-- Loud Social Cockatoo
-- ============================================================

(
'loud_social_cockatoo',
'cockatoo',
'Rio',
'bird',

'large',

'very_high',
'very_high',
'very_high',

'advanced',
60,

360,

'high',
'high',

'very_high',
'high',
'high',

'one_person',

false,

'very_high',

'high',
'very_high',

'high'
),

-- ============================================================
-- Balanced Companion Conure
-- ============================================================

(
'balanced_companion_conure',
'conure',
'Luna',
'bird',

'small',

'high',
'medium',
'medium',

'intermediate',
20,

90,

'medium',
'medium',

'medium',
'low',
'medium',

'multiple_people',

false,

'medium',

'medium',
'medium',

'medium'
),

-- ============================================================
-- Destructive Macaw
-- ============================================================

(
'destructive_macaw',
'macaw',
'Chaos',
'bird',

'very_large',

'very_high',
'very_high',
'high',

'advanced',
55,

420,

'very_high',
'high',

'very_high',
'medium',
'very_high',

'multiple_people',

false,

'very_high',

'high',
'very_high',

'high'
);

-- ============================================================
-- ADOPTERS
-- ============================================================

INSERT INTO adopters VALUES

-- ============================================================
-- Busy Cat Owner
-- ============================================================

(
'busy_cat_owner',

'none',

true,
ARRAY['cat'],

'full_time',

60,
'high',

'low',
'low',

'none',

'low',
10,

'low',

'low',

'{"cat":5}'::jsonb,

'low',
'low',
'low',

'low',

'low',
'low',

'independent',

'low',

'low',

'low',
'low',

'low',

ARRAY[]::TEXT[]
),

-- ============================================================
-- Experienced Bird Keeper
-- ============================================================

(
'experienced_bird_keeper',

'none',

false,
ARRAY[]::TEXT[],

'part_time',

240,
'low',

'high',
'very_high',

'none',

'high',
30,

'high',

'high',

'{"bird":20}'::jsonb,

'high',
'high',
'high',

'high',

'high',
'high',

'one_person',

'high',

'high',

'high',
'high',

'high',

ARRAY[]::TEXT[]
),

-- ============================================================
-- No Time User
-- ============================================================

(
'no_time_user',

'none',

false,
ARRAY[]::TEXT[],

'full_time',

0,
'high',

'low',
'low',

'none',

'low',
2,

'low',

'low',

'{}'::jsonb,

'low',
'low',
'low',

'low',

'low',
'low',

'independent',

'low',

'low',

'low',
'low',

'low',

ARRAY[]::TEXT[]
),

-- ============================================================
-- Motivated Beginner
-- ============================================================

(
'motivated_beginner',

'none',

false,
ARRAY[]::TEXT[],

'part_time',

180,
'medium',

'medium',
'medium',

'none',

'high',
15,

'medium',

'high',

'{"bird":1}'::jsonb,

'high',
'high',
'high',

'medium',

'high',
'high',

'multiple_people',

'medium',

'high',

'high',
'high',

'medium',

ARRAY[]::TEXT[]
),

-- ============================================================
-- Preference Mismatch User
-- ============================================================

(
'preference_mismatch_user',

'none',

false,
ARRAY[]::TEXT[],

'flexible',

180,
'low',

'low',
'low',

'none',

'high',
20,

'high',

'high',

'{"bird":6}'::jsonb,

'low',
'low',
'low',

'low',

'high',
'high',

'independent',

'high',

'medium',

'high',
'high',

'high',

ARRAY[]::TEXT[]
),

-- ============================================================
-- Family Household User
-- ============================================================

(
'family_household_user',

'under_ten',

false,
ARRAY[]::TEXT[],

'full_time',

120,
'medium',

'medium',
'medium',

'none',

'high',
15,

'medium',

'medium',

'{"bird":2}'::jsonb,

'medium',
'medium',
'medium',

'medium',

'medium',
'medium',

'multiple_people',

'medium',

'medium',

'medium',
'medium',

'medium',

ARRAY[]::TEXT[]
),

-- ============================================================
-- Lifestyle Conflict User
-- ============================================================

(
'lifestyle_conflict_user',

'none',

false,
ARRAY[]::TEXT[],

'full_time',

65,
'high',

'low',
'low',

'none',

'low',
30,

'low',

'low',

'{}'::jsonb,

'low',
'low',

'medium',

'low',

'medium',
'medium',

'independent',

'low',

'low',

'low',
'low',

'low',

ARRAY[]::TEXT[]
);