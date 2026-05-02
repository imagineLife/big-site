"use client";

import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { chapters, accentToClasses } from "@/data/timeline";
import { rhythmicProfiles } from "@/data/rhythmic-profiles";

export default function OverviewTimeline() {
  const flat = chapters.flatMap((c) => c.steps.map((s) => ({ ...s, chapterId: c.id, chapterLabel: c.label })));

  return (
    <div>
      <div className="mb-4 text-sm text-zinc-400">
        Tip: use this as a quick overview, then send users into <a href="/scrolly">story mode</a>.
      </div>

      <VerticalTimeline lineColor="rgba(255,255,255,0.12)">
        {flat.map((s) => {
          const a = accentToClasses[s.accent];
          return (
            <VerticalTimelineElement
              key={s.id}
              date={s.dateLabel}
              contentStyle={{
                background: "rgba(9, 9, 11, 0.55)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "white",
                borderRadius: "18px",
                boxShadow: "none",
              }}
              contentArrowStyle={{ borderRight: "7px solid rgba(255,255,255,0.10)" }}
              iconStyle={{
                background: "rgb(9 9 11)",
                boxShadow: "0 0 0 4px rgba(255,255,255,0.10)",
              }}
              icon={<span className={"block h-3 w-3 rounded-full " + a.dot} />}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={"inline-flex items-center rounded-full border px-2 py-0.5 text-xs " + a.pill}>
                  {s.chapterLabel}
                </span>
                {s.rhythmicProfileId ? (
                  (() => {
                    const p = rhythmicProfiles[s.rhythmicProfileId as any];
                    return p ? (
                      <span className={"ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs " + a.pill}>
                        {p.primaryAccents?.length ? p.primaryAccents.join(', ') : p.name}
                      </span>
                    ) : null;
                  })()
                ) : null}
                <h3 className="text-base font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">{s.body}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}
