export function normalizeScore(
  score: number,
  ruleCount: number,
  minPerRule = -10,
  maxPerRule = 10
): number {

  const theoreticalMin = ruleCount * minPerRule;
  const theoreticalMax = ruleCount * maxPerRule;

  return Math.round(
    ((score - theoreticalMin) /
      (theoreticalMax - theoreticalMin)) * 100
  );
}