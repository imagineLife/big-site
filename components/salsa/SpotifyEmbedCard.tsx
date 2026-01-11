import { SpotifyEmbed } from './../../types/repo';
import { toSpotifyEmbedUrl } from './../../utils/spotify';

function SpotifyEmbedCard({
  e,
  by,
}: {
  e: SpotifyEmbed;
  by?: string;
}) {

  const embedUrl = toSpotifyEmbedUrl(e?.embedUrl);
  const isEmbeddable = embedUrl ? embedUrl.includes("open.spotify.com/embed/") : false

  // Bigger by default; playlists/albums get tall player.
  const height =
    e.kind === "playlist" || e.kind === "album" ? 380 : 180;

  return (
    <div className="w-full min-w-0 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-100">
            {e.title}
          </div>
          <div className="mt-1 text-xs text-zinc-300">
            {/* {by ? <>Via <span className="font-medium text-zinc-200">{by}</span></> : null} */}
            {by && e.note ? " • " : null}
            {e.note ? e.note : null}
          </div>
        </div>

        <a
          className="shrink-0 text-xs text-zinc-300 underline decoration-white/20 underline-offset-2 hover:decoration-white/60"
          href={e.embedUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>

      {isEmbeddable ? (
        <div className="mt-3 w-full min-w-0 overflow-hidden rounded-lg border border-white/10">
          <iframe
            src={embedUrl}
            title={e.title}
            width="100%"
            height={height}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ border: 0, display: "block" }}
          />
        </div>
      ) : (
        <div className="mt-3 text-xs text-zinc-300">
          (Not an embeddable Spotify URL — link only.)
        </div>
      )}
    </div>
  );
}

export { SpotifyEmbedCard }