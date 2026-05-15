// scoringRules.scenario.test.ts
// Run with:
// npm run test:scoringScenario

/**
 * SCORING RULES SCENARIO TEST
 *
 * Purpose:
 * - Evaluate whether the scoring system produces meaningful
 *   ranking differences between realistic match scenarios.
 *
 * Focus:
 * - Comparative ranking behavior
 * - Welfare vs human score balance
 * - Compatibility differentiation
 *
 * This test does NOT validate:
 * - hard rule correctness
 * - exact mathematical calculations
 * - aggregation correctness
 *
 * Those are covered in separate tests.
 */

import { matchAdopterWithPet } from '../../services/matching/matchingEngine';

import {
    motivatedBeginnerAdopter,
    highlyExperiencedHighCommitmentAdopter,
    preferenceMismatchAdopter,
    lifestyleConflictAdopter,
    familyHouseholdAdopter,
    lowCommitmentLowToleranceAdopter
} from '../helpers/profiles/adopterProfiles';

import {
    socialBeginnerFriendlyBird,
    highMaintenanceDemandingBird,
    lowMaintenanceIndependentBird,
    loudSocialCockatoo,
    balancedCompanionBird,
    destructiveMacaw,
} from '../helpers/profiles/birdProfiles';

type ScenarioResult = {
    adopter: string;
    bird: string;

    totalScore: number;
    welfareScore: number;
    humanScore: number;

    percentage: number;
};

test('SCORING RULES SCENARIO TEST', () => {

    console.log('\n========================================');
    console.log('SCORING RULES SCENARIO TEST');
    console.log('========================================\n');

    /////////////////////////////
    // PROFILE COLLECTIONS
    /////////////////////////////

    const birdDisplayNames: Record<string, string> = {
        budgie: 'Social Beginner-Friendly Budgie',
        african_grey: 'High-Maintenance African Grey',
        canary: 'Low-Maintenance Canary',
        cockatoo: 'Loud Social Cockatoo',
        conure: 'Balanced Companion Conure',
        macaw: 'Destructive Macaw'
    };

    /////////////////////////////
    // RESULT STORAGE
    /////////////////////////////

    const rankingResults: ScenarioResult[] = [];

    /////////////////////////////
    // MATCH LOOP
    /////////////////////////////

    const scenarios = [
        {
            adopter: preferenceMismatchAdopter,
            bird: lowMaintenanceIndependentBird,
            label: 'Excellent lifestyle compatibility',
        },

        {
            adopter: highlyExperiencedHighCommitmentAdopter,
            bird: balancedCompanionBird,
            label: 'Experienced adopter + balanced bird',
        },

        {
            adopter: highlyExperiencedHighCommitmentAdopter,
            bird: highMaintenanceDemandingBird,
            label: 'Highly experienced adopter + advanced parrot',
        },

        {
            adopter: motivatedBeginnerAdopter,
            bird: socialBeginnerFriendlyBird,
            label: 'Beginner + beginner-friendly bird',
        },

        {
            adopter: lifestyleConflictAdopter,
            bird: destructiveMacaw,
            label: 'Overwhelmed adopter with destructive macaw',
        },

        {
            adopter: lifestyleConflictAdopter,
            bird: loudSocialCockatoo,
            label: 'Lifestyle conflict with demanding social bird',
        },

        {
            adopter: motivatedBeginnerAdopter,
            bird: loudSocialCockatoo,
            label: 'Beginner with demanding social bird',
        },

        {
            adopter: familyHouseholdAdopter,
            bird: balancedCompanionBird,
            label: 'Family household + moderate bird',
        },

        {
            adopter: preferenceMismatchAdopter,
            bird: loudSocialCockatoo,
            label: 'Good welfare capacity but poor preferences',
        },

        {
            adopter: lifestyleConflictAdopter,
            bird: balancedCompanionBird,
            label: 'Lifestyle conflict with companion bird',
        },

        {
            adopter: lowCommitmentLowToleranceAdopter,
            bird: balancedCompanionBird,
            label: 'Low tolerance adopter with moderate bird',
        },

    ];

    for (const scenario of scenarios) {

        const { adopter, bird, label } = scenario;

        console.log('\n----------------------------------------');
        console.log(`SCENARIO: ${label}`);
        console.log('----------------------------------------');

        const result = matchAdopterWithPet(adopter, bird);


        /////////////////////////////////////
        // Ignore rejected matches
        /////////////////////////////////////

        if (result.rejected) {
            console.log('REJECTED');
            console.log(`Reason: ${result.rejectionReason}`);

            console.log('\nExcluded from scoring comparison.\n');

            continue;
        }

        /////////////////////////////////////
        // Store result for ranking
        /////////////////////////////////////

        rankingResults.push({
            adopter: adopter.id,
            bird: birdDisplayNames[bird.speciesId],

            totalScore: result.score,
            welfareScore: result.welfareScore,
            humanScore: result.humanScore,

            percentage: result.percentage,
        });

        /////////////////////////////////////
        // MAIN RESULT OUTPUT
        /////////////////////////////////////

        console.log('\nMATCH RESULT');

        console.table([
            {
                totalScore: result.score,
                welfareScore: result.welfareScore,
                humanScore: result.humanScore,
                percentage: `${result.percentage}%`,
            },
        ]);

        /////////////////////////////////////
        // POSITIVE FACTORS
        /////////////////////////////////////
        const scoringRules = result.rules.filter(
            (rule): rule is any => 'value' in rule
        );

        const positives = scoringRules
            .filter(rule => rule.value > 0)
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        console.log('\nTOP POSITIVE FACTORS');

        positives.forEach(rule => {
            console.log(
                `+ ${rule.ruleName} (${rule.value})`
            );
        });

        /////////////////////////////////////
        // NEGATIVE FACTORS
        /////////////////////////////////////

        const negatives = scoringRules
            .filter(rule => rule.value < 0)
            .sort((a, b) => a.value - b.value)
            .slice(0, 5);

        console.log('\nTOP NEGATIVE FACTORS');

        if (negatives.length === 0) {
            console.log('No major negative factors');
        } else {
            negatives.forEach(rule => {
                console.log(
                    `- ${rule.ruleName} (${rule.value})`
                );
            });
        }

        /////////////////////////////////////
        // RULE BREAKDOWN
        /////////////////////////////////////

        console.log('\nRULE BREAKDOWN');

        console.table(
            scoringRules.map(rule => ({
                rule: rule.ruleName,
                type: rule.scoreType,
                score: rule.value,
            }))
        );
    }

    /////////////////////////////////////
    // FINAL RANKING
    /////////////////////////////////////

    console.log('\n========================================');
    console.log('FINAL MATCH RANKING');
    console.log('========================================\n');

    const ranked = rankingResults.sort(
        (a, b) => b.percentage - a.percentage
    );

    console.table(
        ranked.map((r, index) => ({
            rank: index + 1,
            adopter: r.adopter,
            bird: r.bird,

            totalScore: r.totalScore,
            welfareScore: r.welfareScore,
            humanScore: r.humanScore,

            percentage: `${r.percentage}%`,
        }))
    );

    /////////////////////////////////////
    // DOMAIN EXPECTATION ASSERTIONS
    /////////////////////////////////////

    const eliteGrey = ranked.find(
        r =>
            r.adopter === 'experienced_bird_keeper' &&
            r.bird === 'High-Maintenance African Grey'
    );

    const macawDisaster = ranked.find(
        r =>
            r.adopter === 'lifestyle_conflict_user' &&
            r.bird === 'Destructive Macaw'
    );

    expect(eliteGrey?.percentage)
        .toBeGreaterThan(macawDisaster?.percentage ?? 0);

    /////////////////////////////////////
    // SANITY CHECKS
    /////////////////////////////////////

    expect(ranked.length).toBeGreaterThan(0);

    ranked.forEach(result => {
        expect(result.percentage).toBeGreaterThanOrEqual(0);
        expect(result.percentage).toBeLessThanOrEqual(100);
    });

    console.log('\nSCORING SCENARIO TEST COMPLETED\n');
});