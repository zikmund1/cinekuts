export const TMDB_POSTER = 'https://image.tmdb.org/t/p/w500';

export function formatListDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
