// Samples are available only in local development or an explicit preview build.
export function contentVisible(data: { sample?: boolean }, includeSamples = false): boolean {
  return !data.sample || includeSamples;
}

export function giveawayActive(data: { status: string; endsAt?: Date }, now = new Date()): boolean {
  return data.status === 'live' && !!data.endsAt && data.endsAt.getTime() > now.getTime();
}
