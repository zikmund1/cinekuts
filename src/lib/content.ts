import { getCollection, type CollectionEntry } from 'astro:content';
import { contentVisible } from './publication';

export const includeSamples = import.meta.env.DEV || process.env.CONTENT_PREVIEW === 'true';
export function visibleEntry(entry: { data: { sample?: boolean } }) {
  return contentVisible(entry.data, includeSamples);
}
export async function visibleTitles() {
  return getCollection('titles', visibleEntry);
}
export async function visibleLists() {
  const titles = new Set((await visibleTitles()).map(t => t.slug));
  return getCollection('lists', entry => visibleEntry(entry) && entry.data.items.every(
    item => item.kind !== 'title' || titles.has(item.slug.slug),
  ));
}
export async function listPosters(list: CollectionEntry<'lists'>) {
  const titles = await visibleTitles();
  return list.data.items.slice(0, 4).map(item => item.kind === 'mention'
    ? item.posterPath : titles.find(t => t.slug === item.slug.slug)?.data.posterPath).filter((p): p is string => !!p);
}
