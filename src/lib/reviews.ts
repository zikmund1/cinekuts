export type ReviewKind = 'movie' | 'tv';
export type ReviewStatus = 'published' | 'coming-soon';
export type ReviewSort = 'newest' | 'score' | 'title';

export interface ReviewFilter {
  q: string;
  type: 'all' | ReviewKind;
  status: 'all' | ReviewStatus;
  sort: ReviewSort;
}

export interface ReviewIndexItem {
  title: string;
  type: ReviewKind;
  status: ReviewStatus;
  score: number | null;
  date: number;
}

export function reviewMatches(item: ReviewIndexItem, filter: ReviewFilter): boolean {
  const q = filter.q.trim().toLowerCase();
  if (q && !item.title.toLowerCase().includes(q)) return false;
  if (filter.type !== 'all' && item.type !== filter.type) return false;
  if (filter.status !== 'all' && item.status !== filter.status) return false;
  return true;
}

export function compareReviews(a: ReviewIndexItem, b: ReviewIndexItem, sort: ReviewSort): number {
  if (sort === 'title') return a.title.localeCompare(b.title);
  if (sort === 'score') return (b.score ?? -1) - (a.score ?? -1);
  if (a.status !== b.status) return a.status === 'published' ? -1 : 1;
  return b.date - a.date;
}

export function parseReviewFilter(params: URLSearchParams): ReviewFilter {
  const type = params.get('type');
  const status = params.get('status');
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    type: type === 'movie' || type === 'tv' ? type : 'all',
    status: status === 'published' || status === 'coming-soon' ? status : 'all',
    sort: sort === 'score' || sort === 'title' || sort === 'newest' ? sort : 'newest',
  };
}
