// matching.utils.ts

export function normalizeScore(score: number): number {

  const theoreticalMin = -135;
  const theoreticalMax = 150;

  const percentage =
    ((score - theoreticalMin) /
      (theoreticalMax - theoreticalMin)) * 100;

  return Math.max(0, Math.min(100, Math.round(percentage)));
}