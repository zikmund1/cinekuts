export const KUTS_CATEGORIES = [
  { key: 'storyWriting', label: 'Story / Writing' },
  { key: 'performances', label: 'Performances' },
  { key: 'craft', label: 'Craft' },
  { key: 'emotionalImpact', label: 'Emotional impact' },
  { key: 'rewatchValue', label: 'Rewatch / recommend' },
] as const;

export type KutsCategoryKey = (typeof KUTS_CATEGORIES)[number]['key'];

export type KutsBreakdown = Record<KutsCategoryKey, number>;

export function averageKutsScore(breakdown: KutsBreakdown): number {
  const total = KUTS_CATEGORIES.reduce((sum, category) => sum + breakdown[category.key], 0);
  return total / KUTS_CATEGORIES.length;
}

export function formatKutsScore(score: number): string {
  return score.toFixed(1);
}
