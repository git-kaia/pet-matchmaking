-- ============================================================
--  ORGANIZATION
-- ============================================================

INSERT INTO organization (id, name)
VALUES (1, 'Fugleteamet');



-- ============================================================
--  ORG MEMBERS
-- ============================================================

INSERT INTO org_member (id, username, first_name, last_name, email, phone, password, organization_id)
VALUES
(1, 'maria.fugle', 'Maria', 'Hansen', 'maria.hansen@example.com', '+4798123456', '*****', 1),
(2, 'ola.birdman', 'Ola', 'Nilsen', 'ola.nilsen@example.com', '+4798876543', '*****', 1),
(3, 'katrine.admin', 'Katrine', 'Solberg', 'katrine.solberg@example.com', '+4799345678', '*****', 1);



-- ============================================================
--  ADOPTANTS
-- ============================================================

INSERT INTO adoptant (id, username, first_name, last_name, email, phone, password)
VALUES
(1, 'olaN', 'Ola', 'Nordmann', 'ola.n@example.com', '+4794123456', '*****'),
(2, 'emmaB', 'Emma', 'Brodahl', 'emma.b@example.com', '+4799881723', '*****'),
(3, 'stianR', 'Stian', 'Røed', 'stian.r@example.com', '+4797788145', '*****'),
(4, 'ida23', 'Ida', 'Gulliksen', 'ida.g@example.com', '+4799451134', '*****'),
(5, 'martinS', 'Martin', 'Sundby', 'martin.s@example.com', '+4796677123', '*****'),
(6, 'sara_h', 'Sara', 'Holmen', 'sara.h@example.com', '+4798852341', '*****'),
(7, 'eliseW', 'Elise', 'Wangen', 'elise.w@example.com', '+4799824551', '*****'),
(8, 'johannes88', 'Johannes', 'Berg', 'jo.berg@example.com', '+4790412312', '*****'),
(9, 'linaS', 'Lina', 'Samuelsen', 'lina.s@example.com', '+4790123499', '*****'),
(10, 'henrikG', 'Henrik', 'Gran', 'henrik.g@example.com', '+4795559911', '*****');



-- ============================================================
--  GENERAL QUIZ ANSWERS (EXAMPLES)
-- ============================================================

INSERT INTO quiz_general (
    adoptant_id,
    household_type,
    space_level,
    children_present,
    children_age,
    has_current_pets,
    current_pet_types,
    noise_level,
    noise_tolerance,
    cleaning_tolerance,
    work_pattern,
    work_hours,
    daily_pet_time_minutes,
    alone_time_level,
    lifestyle_stability,
    commitment_horizon_years,
    rehoming_responsibility,
    economic_priority,
    allergy_sensitivity,
    has_pet_experience,
    pet_experience_types,
    years_experience,
    learning_willingness,
    desired_sociality,
    desired_cuddliness,
    problem_behavior_tolerance
)
VALUES
(1, 'par', 'middels', false, NULL, true, '{katt}', 'middels', 'middels', 'høy',
 'fulltid', 'dagtid', 150, 'middels', 'høy', 10, 'middels', 'middels', 'ingen',
 true, '{katt}', 2, 'høy', 'middels', 'middels', 'middels'),

(2, 'enslig', 'liten', false, NULL, false, '{}', 'lav', 'lav', 'middels',
 'deltid', 'dagtid', 60, 'lav', 'middels', 5, 'lav', 'lav', 'mild',
 true, '{fugl}', 1, 'middels', 'høy', 'høy', 'lav'),

(3, 'familie_med_barn', 'stor', true, 'over_ti', true, '{hund, katt}', 'høy', 'middels', 'lav',
 'fulltid', 'skiftarbeid', 240, 'høy', 'høy', 15, 'middels', 'middels', 'ingen',
 true, '{hund}', 4, 'høy', 'høy', 'høy', 'middels'),

(4, 'kollektiv', 'middels', false, NULL, false, '{}', 'middels', 'lav', 'lav',
 'ikke_i_arbeid', 'kveldstid', 120, 'lav', 'lav', 5, 'lav', 'lav', 'ingen',
 false, '{}', 0, 'middels', 'lav', 'lav', 'lav'),

(5, 'par', 'liten', false, NULL, true, '{gnager}', 'lav', 'middels', 'middels',
 'deltid', 'dagtid', 90, 'middels', 'middels', 8, 'middels', 'høy', 'mild',
 true, '{gnager}', 3, 'høy', 'høy', 'middels', 'middels');

-- Add answers for 6–10 similarly if needed.


-- ============================================================
--  BIRD-SPECIFIC QUIZ ANSWERS (EXAMPLES)
-- ============================================================

INSERT INTO quiz_bird (
    adoptant_id,
    sleep_environment_tolerance,
    free_flying_expectation,
    tolerance_free_roaming,
    tolerance_mess,
    tolerance_destruction,
    desired_human_interaction,
    desired_attachment_style,
    acceptance_bird_over_human,
    tameness_requirement,
    adoption_complexity_tolerance,
    want_multiple_birds,
    current_bird_species,
    noise_sensitive_time,
    startle_noise_tolerance,
    enrichment_engagement,
    training_interest,
    diet_complexity_tolerance
)
VALUES
(1, 'middels', 'middels', 'middels', 'lav', 'lav', 'middels', 'flere_personer', 'middels',
 'middels', 'middels', 'lav', '{}', 'ikke_viktig', 'middels', 'høy', 'middels', 'middels'),

(2, 'høy', 'lav', 'lav', 'middels', 'lav', 'høy', 'en_person', 'lav',
 'lav', 'lav', 'middels', '{}', 'morgen', 'lav', 'middels', 'lav', 'lav'),

(3, 'middels', 'høy', 'høy', 'middels', 'middels', 'høy', 'flere_personer', 'høy',
 'høy', 'høy', 'høy', '{undulat}', 'kveld', 'middels', 'høy', 'høy', 'middels');


-- ============================================================
--  ANIMAL PROFILES (BIRDS)
--  Using species data from Parametere-adopsjonsapp - Fugler.pdf
-- ============================================================

INSERT INTO animal_profile (
    id,
    name,
    species,
    species_latin,
    created_by_org_member_id,
    size,
    noise_volume,
    noise_frequency,
    activity_level,
    social_need,
    mental_stimulation,
    training_need,
    mimicry_ability,
    cuddly,
    diet_complexity,
    malnutrition_risk,
    sleep_hours,
    calm_dark_requirement,
    irregular_rhythm_tolerance,
    experience_required,
    space_requirement,
    lifespan_years,
    description
)
VALUES
(1, 'Pip', 'Undulat', 'Melopsittacus undulatus', 1, 'liten', 'lav', 'flere_ganger_daglig', 'høyt',
 'sosial', 'middels', 'lav', 'middels', 'middels', 'lav', 'lav', 12, 'middels', 'delvis', 'nybegynner',
 'liten', '5-10', 'Sosial og lett for nybegynnere'),

(2, 'Sunny', 'Solparakitt', 'Aratinga solstitialis', 2, 'middels', 'ekstremt_høyt', 'flere_ganger_daglig', 'høyt',
 'svært_sosial', 'svært_høyt', 'høyt', 'høy', 'middels', 'middels', 'middels', 12, 'høyt', 'nei', 'erfaren',
 'stort', '25-30', 'Meget høylytt og krever mye stimulering'),

(3, 'Bongo', 'Grønnkinnet konure', 'Pyrrhura molinae', 1, 'liten-middels', 'middels', 'daglig', 'høyt',
 'svært_sosial', 'høyt', 'middels', 'høy', 'veldig', 'middels', 'middels', 12, 'middels', 'nei', 'noe_erfaring',
 'middels', '20-30', 'Aktiv og kosete'),

(4, 'Koko', 'Nymfekakadue', 'Nymphicus hollandicus', 3, 'middels', 'middels', 'daglig', 'lavt',
 'sosial', 'middels', 'middels', 'høy', 'veldig', 'middels', 'lav', 12, 'middels', 'delvis', 'nybegynner',
 'middels', '15-20', 'Rolig og populær art'),

(5, 'Athena', 'Grå jako', 'Psittacus erithacus', 2, 'stor', 'høyt', 'daglig', 'middels',
 'svært_sosial', 'svært_høyt', 'høyt', 'svært_høy', 'middels', 'høy', 'høy', 14, 'høyt', 'nei', 'erfaren',
 'stort', '40-60', 'Svært intelligent og krevende'),

(6, 'Rubi', 'Dvergpapegøye (ferskenhodet)', 'Agapornis roseicollis', 3, 'liten', 'middels', 'daglig', 'høyt',
 'svært_sosial', 'middels', 'middels', 'middels', 'middels', 'lav', 'lav', 12, 'middels', 'nei', 'noe_erfaring',
 'middels', '10-15', 'Sterk parbinding'),

(7, 'Kiwi', 'Kanari', 'Serinus canaria', 1, 'liten', 'lav', 'daglig', 'middels',
 'lite_sosial', 'lavt', 'lavt', 'middels', 'lite', 'middels', 'lav', 12, 'lavt', 'ja', 'nybegynner',
 'middels', '10-15', 'Sangfugl'),

(8, 'Nova', 'Hvitkakadue', 'Cacatua alba', 2, 'stor', 'ekstremt_høyt', 'daglig', 'høyt',
 'svært_sosial', 'svært_høyt', 'høyt', 'svært_høy', 'veldig', 'høy', 'høy', 14, 'svært_høyt', 'nei', 'svært_erfaren',
 'svært_stort', '50-70', 'Svært krevende art');

-- Add more if needed