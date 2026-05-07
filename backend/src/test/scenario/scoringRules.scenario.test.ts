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

import { adopterProfiles } from '../helpers/profiles/adopterProfiles';
import { birdProfiles } from '../helpers/profiles/birdProfiles';

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

    const adopters = adopterProfiles.filter(
        adopter =>
            adopter.id !== 'no_time_user' &&
            adopter.id !== 'busy_cat_owner'
    );

    const birds = birdProfiles;

    const birdDisplayNames: Record<string, string> = {
        budgie: 'Social Beginner-Friendly Budgie',
        african_grey: 'High-Maintenance African Grey',
        canary: 'Low-Maintenance Canary',
        cockatoo: 'Loud Social Cockatoo',
        conure: 'Balanced Companion Conure',
    };

    /////////////////////////////
    // RESULT STORAGE
    /////////////////////////////

    const rankingResults: ScenarioResult[] = [];

    /////////////////////////////
    // MATCH LOOP
    /////////////////////////////

    for (const adopter of adopters) {

        for (const bird of birds) {

            console.log('\n----------------------------------------');
            console.log(`MATCH: ${adopter.id} ↔ ${birdDisplayNames[bird.speciesId]}`);
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

    const expertGrey = ranked.find(
        r =>
            r.adopter === 'experienced_bird_keeper' &&
            r.bird === 'african_grey'
    );

    const beginnerGrey = ranked.find(
        r =>
            r.adopter === 'motivated_beginner' &&
            r.bird === 'african_grey'
    );

    const mismatchCockatoo = ranked.find(
        r =>
            r.adopter === 'preference_mismatch_user' &&
            r.bird === 'cockatoo'
    );

    const mismatchCanary = ranked.find(
        r =>
            r.adopter === 'preference_mismatch_user' &&
            r.bird === 'canary'
    );

    /////////////////////////////////////
    // RELATIVE RANKING ASSERTIONS
    /////////////////////////////////////

    if (expertGrey && beginnerGrey) {
        expect(expertGrey.percentage)
            .toBeGreaterThan(beginnerGrey.percentage);
    }

    if (mismatchCanary && mismatchCockatoo) {
        expect(mismatchCanary.percentage)
            .toBeGreaterThan(mismatchCockatoo.percentage);
    }

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