const WATCH_ID = /[?&]v=([\w-]{11})/;
const SHORT_ID = /youtu\.be\/([\w-]{11})/;
const EMBED_ID = /youtube\.com\/embed\/([\w-]{11})/;

export function youtubeWatchToEmbed(url: string): string {
  const id =
    url.match(WATCH_ID)?.[1] ??
    url.match(SHORT_ID)?.[1] ??
    url.match(EMBED_ID)?.[1];

  if (!id) {
    throw new Error(`Cannot parse YouTube video id from: ${url}`);
  }

  return `https://www.youtube.com/embed/${id}`;
}
