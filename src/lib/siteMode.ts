export function isComingSoon(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return env.SITE_MODE === 'coming-soon';
}
