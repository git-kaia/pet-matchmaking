import { MatchResult } from '../types/matching.types';

export function generateMatchFeedback(result: MatchResult) {

  // rejected case
  if (result.rejected) {
    return {
      rejected: true,
      rejectionReason: result.rejectionReason,
      percentage: result.percentage ?? 0,
      positives: [],
      negatives: [],
      conclusion:
        'Denne matchen ble avvist fordi grunnleggende krav for dyrets behov ikke er oppfylt.',
    };
  }

  const positives: string[] = [];
  const negatives: string[] = [];

  result.rules.forEach((rule: any) => {
    const explanation = explainRule(rule);
    if (!explanation) return;

    if (rule.value > 0) positives.push(explanation);
    if (rule.value < 0) negatives.push(explanation);
  });

  return {
    rejected: false,
    percentage: result.percentage, // ✅ bruker systemverdi
    positives,
    negatives,
    conclusion: generateConclusion(result.percentage),
  };
}

// explain rules

function explainRule(rule: any): string | null {
  const isPositive = rule.value > 0;

  const explanations: Record<string, (positive: boolean) => string> = {

    timeAvailability: (p) =>
      p
        ? 'Du har nok tid til å følge opp dyret'
        : 'Du har for lite tid til dyrets behov',

    noiseTolerance: (p) =>
      p
        ? 'Støynivået passer deg godt'
        : 'Dyret kan oppleves som for støyende',

    aloneTimeRisk: (p) =>
      p
        ? 'Dyret vil ikke være for mye alene'
        : 'Dyret risikerer å være for mye alene',

    lifeStability: (p) =>
      p
        ? 'Du har en stabil livssituasjon'
        : 'Livssituasjonen din er usikker for dyrehold',

    commitmentVsLifespan: (p) =>
      p
        ? 'Du kan ta ansvar for dyret over tid'
        : 'Forpliktelsen din er lav i forhold til dyrets levetid',

    experienceMatch: (p) =>
      p
        ? 'Du har relevant erfaring'
        : 'Du mangler erfaring for dette dyret',

    learningWillingness: (p) =>
      p
        ? 'Du er villig til å lære'
        : 'Lav vilje til å lære kan bli utfordrende',

    cleaningTolerance: (p) =>
      p
        ? 'Rengjøringsnivået passer deg'
        : 'Dyret krever mer rengjøring enn du ønsker',

    financialPriority: (p) =>
      p
        ? 'Økonomien din dekker behovene'
        : 'Dyret kan bli økonomisk krevende',

    desiredSociability: (p) =>
      p
        ? 'Dere matcher godt sosialt'
        : 'Dere har ulike sosiale behov',

    affectionExpectation: (p) =>
      p
        ? 'Forventning til nærhet passer godt'
        : 'Dere har ulike forventninger til nærhet',

    behaviorTolerance: (p) =>
      p
        ? 'Du håndterer atferden godt'
        : 'Atferden kan bli utfordrende for deg',
  };

  // Return null hvis regelen ikke er definert → filtreres bort
  if (!explanations[rule.ruleName]) return null;

  return explanations[rule.ruleName](isPositive);
}


// conclusion

function generateConclusion(score: number): string {

  if (score >= 80) {
    return 'Dette er en svært god match. Forutsetningene ligger veldig godt til rette for et stabilt og trygt dyrehold. Ta kontakt med organisasjonen for å gå videre med denne matchen!';
  }

  if (score >= 60) {
    return 'Dette er en god match, men enkelte forhold kan kreve tilpasning over tid. Vær oppmerksom på de punktene dere ikke matcher så bra på, og vurder hvordan du kan håndtere dem før du går videre. ';
  }

  if (score >= 40) {
    return 'Dette er en usikker match. Det er flere forhold du bør vurdere nøye før du går videre. Vær oppmerksom på at vi ønsker det beste for både deg og dyret, det kan være lurt å se etter andre alternativer for deg. ';
  }

  return 'Denne fuglen passer trolig ikke godt for deg. Vi anbefaler deg å se etter andre alternativer som passer bedre til deg og din livssituasjon.';
}