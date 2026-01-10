import { useInView } from "react-intersection-observer";
import { Item } from "./../../types/repo";
import React from "react";
import { accentToClasses } from "@/data/timeline";
import TagPill from "@/components/salsa/TagPill";
import Collapsible from "@/components/salsa/Collapsible";
import { SpotifyEmbedCard } from "@/components/salsa/SpotifyEmbedCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs font-medium text-zinc-200">{title}</div>
      <div className="mt-2 text-sm text-zinc-200">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

export default function StepCard({
  item,
  index,
  total,
  isActive,
  onActivate,
}: {
  item: Item;
  index: number;
  total: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const { ref, inView } = useInView({
    threshold: 0.35,
    rootMargin: "-35% 0px -45% 0px",
  });

  React.useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  const a = accentToClasses[item.step.accent];

  // ✅ Convert "• " bullets into Markdown list items "- "
  const bodyMarkdown = React.useMemo(() => {
    return item.step.body.replace(/^\s*•\s+/gm, "- ");
  }, [item.step.body]);

  const hasDetails =
    (item.step.musicalImpact?.length ?? 0) > 0 ||
    (item.step.instrumentation?.length ?? 0) > 0 ||
    (item.step.keyMusicians?.length ?? 0) > 0 ||
    (item.step.relatedStyles?.length ?? 0) > 0;

const musicianEmbeds =
  item.step.keyMusicians?.flatMap((m) =>
    (m.spotifyEmbeds ?? []).map((e, idx) => {
      // normalize: prefer e.url; fall back if your type uses embedUrl
      const url = (e as any).url ?? (e as any).embedUrl ?? "";

      return {
        ...e,
        url,              // ensure url exists
        _by: m.name,
        _id: `${m.name}::${url || "missing-url"}::${idx}`, // stable + unique within musician
      };
    })
  ) ?? [];
  

    // Keep it light (or remove slice to show everything)
    // .slice(0, 2);
  const embeds = musicianEmbeds

  return (
    <div className="min-h-[110svh]">
      {/* Trigger line */}
      <div ref={ref} className="h-px w-full" />

      {/* Reading zone: gap above/below card */}
      <div className="pt-[26svh] pb-[30svh]">
        <div
          className={[
            "mx-auto w-full max-w-[46rem] rounded-2xl border p-5 shadow-xl backdrop-blur transition-colors",
            "sm:p-6",
            isActive ? "border-white/25 bg-black/60" : "border-white/10 bg-black/45",
          ].join(" ")}
        >
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* <span className={"inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs " + a.pill}>
              <span className={"h-2 w-2 rounded-full " + a.dot} />
              {item.chapterLabel}
            </span> */}

            <span className="text-xs text-zinc-300">{item.step.dateLabel}</span>

            <span className="ml-auto text-xs text-zinc-400">
              {index + 1}/{total}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            {item.step.title}
          </h3>

          {/* Optional chapter description (keep if you like it) */}
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {item.chapterDescription}
          </p>

          {/* ✅ Better layout: narrative + details */}
          <div className={["mt-5", hasDetails ? "lg:grid lg:grid-cols-[1fr_0.9fr] lg:gap-5" : ""].join(" ")}>
            {/* Narrative */}
            <div className="min-w-0">
              <div className="prose prose-invert max-w-none prose-p:my-3 prose-li:my-1 prose-strong:text-zinc-50">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {bodyMarkdown}
                </ReactMarkdown>
              </div>
            </div>

            {/* Details */}
            {hasDetails ? (
              <>
                {/* Desktop: visible panels */}
                <div className="mt-5 space-y-3 lg:mt-0 hidden lg:block">
                  {item.step.musicalImpact?.length ? (
                    <InfoPanel title="Musical impact">
                      <BulletList items={item.step.musicalImpact} />
                    </InfoPanel>
                  ) : null}

                  {item.step.instrumentation?.length ? (
                    <InfoPanel title="Instrumentation">
                      <BulletList items={item.step.instrumentation} />
                    </InfoPanel>
                  ) : null}

                  {item.step.keyMusicians?.length ? (
                    <InfoPanel title="Key musicians">
                      <div className="space-y-3">
                        {item.step.keyMusicians.map((m) => (
                          <div key={m.name} className="rounded-xl border border-white/10 bg-black/20 p-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <div className="text-sm font-semibold text-zinc-100">
                                {m.name}
                              </div>
                              {m.role ? <div className="text-xs text-zinc-300">{m.role}</div> : null}
                            </div>
                            {m.why ? <p className="mt-2 text-sm text-zinc-200">{m.why}</p> : null}

                            {/* {m.spotifyEmbeds?.length && (
                              <div className="mt-3">
                                <Collapsible title="Listen on Spotify" defaultOpen={false}>
                                  <div className="space-y-3">
                                    {m.spotifyEmbeds.map((e) => (
                                      <SpotifyEmbedCard key={e.title + e.embedUrl} e={e} />
                                    ))}
                                  </div>
                                </Collapsible>
                              </div>
                            )} */}
                          </div>
                        ))}
                      </div>
                    </InfoPanel>
                  ) : null}
                </div>

                {/* Mobile: collapsibles */}
                <div className="mt-5 space-y-3 lg:hidden">
                  {item.step.musicalImpact?.length ? (
                    <Collapsible title="Musical impact" defaultOpen={isActive}>
                      <BulletList items={item.step.musicalImpact} />
                    </Collapsible>
                  ) : null}

                  {item.step.instrumentation?.length ? (
                    <Collapsible title="Instrumentation" defaultOpen={false}>
                      <BulletList items={item.step.instrumentation} />
                    </Collapsible>
                  ) : null}

                  {item.step.keyMusicians?.length ? (
                    <Collapsible title="Key musicians" defaultOpen={false}>
                      <div className="space-y-3">
                        {item.step.keyMusicians.map((m) => (
                          <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <div className="text-sm font-semibold text-zinc-100">
                                {m.url ? (
                                  <a
                                    href={m.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline decoration-white/25 underline-offset-2 hover:decoration-white/70"
                                  >
                                    {m.name}
                                  </a>
                                ) : (
                                  m.name
                                )}
                              </div>
                              {m.role ? <div className="text-xs text-zinc-300">{m.role}</div> : null}
                            </div>
                            {m.why ? <p className="mt-2 text-sm text-zinc-200">{m.why}</p> : null}
                          </div>
                        ))}
                      </div>
                    </Collapsible>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          {embeds.length > 0 ? (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">Listen</div>
                  </div>
                </div>
                  {embeds.map((e) => (
                    <SpotifyEmbedCard
                      key={e?._id}
                      e={e}
                      by={e._by}
                    />
                  ))}
                </div>
          ) : null}

          {/* Related styles (chips) */}
          {item.step.relatedStyles?.length ? (
            <div className="mt-4">
              <div className="text-xs font-medium text-zinc-300">Related styles</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.step.relatedStyles.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
