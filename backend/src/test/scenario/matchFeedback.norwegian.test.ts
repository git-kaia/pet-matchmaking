/**
 * MATCH FEEDBACK SCRIPT (NORWEGIAN UI OUTPUT)
 *
 * Purpose:
 * - Convert scoring system into user-understandable feedback
 * - Explain WHY match is good or bad
 * - Provide structured Norwegian UI text
 */

// to run this test: "npm run test:matchFeedbackNorwegian"

import { getMatchingService } from '../../services/matching/matchingEngine';
import { createTestAdopter } from '../helpers/createTestAdopter';
import { createTestBird } from '../helpers/createTestBird';


test('MATCH FEEDBACK – ANALYTICAL NORWEGIAN OUTPUT', () => {

  console.log('\n==============================');
  console.log('MATCH FEEDBACK (NORWEGIAN)');
  console.log('==============================\n');

  // -------------------------
  // TEST DATA (REALISTIC CASE)
  // -------------------------

  const adopter = createTestAdopter({
    id: 'feedback_adopter',
    dailyCareTime: 100,
    householdWorkPattern: 'flexible',
    commitmentHorizonYears: 15,
    noiseToleranceLevel: 'medium',
    cleaningTolerance: 'medium',
    lifeStability: 'medium',
    financialPriority: 'high',
    learningWillingness: 'high',
    desiredPetAffectionLevel: 'medium',
    desiredPetSociability: 'high',
    problemBehaviorTolerance: 'medium',
    aloneTimeHours: 'high',
  });

  const bird = createTestBird({
    id: 'feedback_bird',
    timeRequired: 60,
    noiseLevel: 'medium',
    socialNeed: 'high',
    affectionLevel: 'medium',
    lifespanYears: 20,
    experienceLevel: 'intermediate',
    messLevel: 'medium',
    financialBurden: 'medium',
    behaviourIssues: 'medium',
  });

  const result = getMatchingService(bird).execute(adopter);

  // -------------------------
  // HANDLE REJECTION
  // -------------------------

  if (result.rejected) {
    console.log('❌ MATCH AVVIST');
    console.log(`Årsak: ${result.rejectionReason ?? 'Ukjent årsak'}`);

    console.log('\n💬 Vurdering:');
    console.log(
      'Denne matchen ble avvist fordi grunnleggende krav for dyrets behov ikke er oppfylt. ' +
      'Det anbefales å vurdere et annet dyr som passer bedre til din situasjon.'
    );

    expect(result.rejected).toBe(true);
    return;
  }

  // -------------------------
  // ANALYSE AV REGLER
  // -------------------------

  const positives: string[] = [];
  const negatives: string[] = [];
  const neutral: string[] = [];

  result.rules.forEach((rule: any) => {
    const explanation = explainRule(rule);

    if (rule.value >= 7) {
      positives.push(explanation);
    } else if (rule.value <= 3) {
      negatives.push(explanation);
    } else {
      neutral.push(explanation);
    }
  });

  // -------------------------
  // SCORE NORMALIZATION
  // -------------------------

  const MAX = 10;
  const MIN = -10;
  const n = result.rules.length;

  const percentage = Math.round(
    ((result.score - (n * MIN)) / ((n * MAX) - (n * MIN))) * 100
  );

  // -------------------------
  // OUTPUT – OVERVIEW
  // -------------------------

  console.log('\n📊 MATCHOVERSIKT');
  console.log('------------------------------');
  console.log(`Matchscore: ${percentage}%`);
  console.log(`Total score: ${result.score}`);
  console.log(`Antall regler evaluert: ${n}`);

  // -------------------------
  // POSITIVE MATCHES
  // -------------------------

  console.log('\n✅ DETTE PASSER BRA');
  console.log('------------------------------');

  if (positives.length === 0) {
    console.log('Ingen sterke positive faktorer identifisert');
  } else {
    positives.forEach(p => console.log(`+ ${p}`));
  }

  // -------------------------
  // NEGATIVE MATCHES
  // -------------------------

  console.log('\n⚠️ UTFORDRINGER I MATCHEN');
  console.log('------------------------------');

  if (negatives.length === 0) {
    console.log('Ingen kritiske utfordringer identifisert');
  } else {
    negatives.forEach(n => console.log(`- ${n}`));
  }

  // -------------------------
  // NEUTRAL FACTORS
  // -------------------------

  console.log('\n🟡 NØYTRALE FORHOLD');
  console.log('------------------------------');

  if (neutral.length === 0) {
    console.log('Ingen nøytrale faktorer');
  } else {
    neutral.forEach(n => console.log(`• ${n}`));
  }

  // -------------------------
  // TABLE (THESIS FRIENDLY)
  // -------------------------

  console.log('\n📋 DETALJERT ANALYSE');

  console.table(
    result.rules.map((r: any) => ({
      Regel: r.ruleName,
      Type: r.scoreType,
      Poeng: r.value,
      Vurdering:
        r.value >= 7
          ? 'God match'
          : r.value <= 3
          ? 'Dårlig match'
          : 'Nøytral',
    }))
  );

  // -------------------------
  // FINAL CONCLUSION
  // -------------------------

  console.log('\n💬 KONKLUSJON');
  console.log('------------------------------');
  console.log(generateNorwegianConclusion(percentage));

  // -------------------------
  // ASSERTIONS
  // -------------------------

  expect(result.rejected).toBe(false);
  expect(result.score).toBeGreaterThan(0);
  expect(result.rules.length).toBeGreaterThan(5);
});


// ======================================================
// RULE → HUMAN EXPLANATION
// ======================================================

function explainRule(rule: any): string {
  const explanations: Record<string, (r: any) => string> = {

    timeAvailability: (r) =>
      r.value >= 7
        ? 'Du har tilstrekkelig tid til å dekke dyrets behov'
        : 'Du har begrenset tid til daglig oppfølging',

    noiseTolerance: (r) =>
      r.value >= 5
        ? 'Støynivået passer godt med dine preferanser'
        : 'Dyret kan oppleves som for støyende',

    aloneTimeRisk: (r) =>
      r.value >= 5
        ? 'Alenetid er håndterbar for dette dyret'
        : 'Dyret kan bli mye alene i løpet av dagen',

    lifeStability: (r) =>
      r.value >= 5
        ? 'Din livssituasjon er stabil nok for dyrehold'
        : 'Livssituasjonen kan være for ustabil',

    commitmentVsLifespan: (r) =>
      r.value >= 5
        ? 'Du kan følge opp dyret gjennom hele levetiden'
        : 'Forpliktelsen din er lav i forhold til dyrets levetid',

    experienceMatch: (r) =>
      r.value >= 5
        ? 'Du har tilstrekkelig erfaring med denne typen dyr'
        : 'Du har begrenset erfaring med denne typen dyr',

    learningWillingness: (r) =>
      r.value >= 5
        ? 'Du er villig til å lære og tilpasse deg dyrets behov'
        : 'Lav vilje til å lære kan gjøre dyrehold mer utfordrende',

    cleaningTolerance: (r) =>
      r.value >= 5
        ? 'Du tåler rengjøringsbehovet godt'
        : 'Dyret kan kreve mer rengjøring enn du foretrekker',

    financialPriority: (r) =>
      r.value >= 5
        ? 'Økonomien din dekker dyrets behov'
        : 'Dyret kan være økonomisk krevende',

    childrenCompatibility: (r) =>
      r.value >= 5
        ? 'Dyret passer godt i et hjem med barn'
        : 'Dyret kan være mindre egnet i hjem med barn',

    desiredSociability: (r) =>
      r.value >= 5
        ? 'Sosialt behov matcher dine preferanser'
        : 'Forskjell i ønsket sosialt nivå',

    affectionExpectation: (r) =>
      r.value >= 5
        ? 'Forventet nærhet og kos samsvarer godt'
        : 'Ulik forventning til nærhet og kos',

    behaviorTolerance: (r) =>
      r.value >= 5
        ? 'Du tåler dyrets atferd godt'
        : 'Dyrets atferd kan være utfordrende for deg',
  };

  return explanations[rule.ruleName]
    ? explanations[rule.ruleName](rule)
    : rule.ruleName;
}


// ======================================================
// FINAL CONCLUSION GENERATOR
// ======================================================

function generateNorwegianConclusion(score: number): string {

  if (score >= 80) {
    return 'Dette er en svært god match. Adoptanten og dyret har svært gode forutsetninger for et stabilt og harmonisk forhold.';
  }

  if (score >= 60) {
    return 'Dette er en god match, men enkelte forhold kan kreve tilpasning over tid.';
  }

  if (score >= 40) {
    return 'Dette er en usikker match. Flere viktige behov er ikke optimalt dekket.';
  }

  return 'Denne matchen anbefales ikke. Det er flere grunnleggende behov som ikke er oppfylt.';
}