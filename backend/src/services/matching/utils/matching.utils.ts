// matching.utils.ts

export function normalizeScore(
  score: number,
  ruleCount: number,
  minPerRule = -10,
  maxPerRule = 10
): number {

  if (ruleCount === 0) return 0;

  const theoreticalMin = ruleCount * minPerRule;
  const theoreticalMax = ruleCount * maxPerRule;

  const percentage =
    ((score - theoreticalMin) /
      (theoreticalMax - theoreticalMin)) * 100;

  return Math.max(0, Math.min(100, Math.round(percentage)));
}