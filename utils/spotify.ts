const SPOTIFY_TYPES = ['track', 'album', 'playlist', 'artist'] as const;
type SpotifyType = (typeof SPOTIFY_TYPES)[number];

function toSpotifyEmbedUrl(input: string) {
  if (!input) return '';

  const raw = input.trim();

  // spotify:track:ID etc
  if (raw.startsWith('spotify:')) {
    const [, type, id] = raw.split(':');
    if (SPOTIFY_TYPES.includes(type as SpotifyType) && id) {
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
    return '';
  }

  // strip query params
  const noQuery = raw.split('?')[0];

  // match:
  // - /track/:id
  // - /embed/track/:id
  // - /intl-en/track/:id
  // - /intl-en/embed/track/:id
  const m = noQuery.match(
    /open\.spotify\.com\/(?:(?:intl-[^/]+)\/)?(?:(?:embed)\/)?(track|album|playlist|artist)\/([A-Za-z0-9]+)/
  );

  if (!m) return noQuery;

  const [, type, id] = m;
  return `https://open.spotify.com/embed/${type}/${id}`;
}

export { toSpotifyEmbedUrl };
