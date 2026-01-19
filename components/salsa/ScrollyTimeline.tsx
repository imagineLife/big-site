"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/timeline";
import { Active, Item } from "./../../types/repo";
import SectionHeader from "@/components/salsa/SectionHeader";
import StepCard from "./StepCard";



function buildChapterGroups() {
  return chapters.map((chapter, chapterIndex) => {
    const items: Array<Omit<Item, "chapterId">> = chapter.steps.map((step, stepIndex) => ({
      step,
      chapterIndex,
      stepIndex,
      chapterLabel: chapter.label,
      chapterDescription: chapter.description,
    }));

    return { chapter, items };
  });
}

const chapterGroups = buildChapterGroups();
const all = chapterGroups.flatMap((group) => group.items);
const indexById = new Map<string, number>(all.map((item, index) => [item.step.id, index]));

export default function ScrollyTimeline() {
  const [active, setActive] = React.useState<Active>(() => ({
    step: all[0].step,
    chapterIndex: all[0].chapterIndex,
    stepIndex: all[0].stepIndex,
  }));
  const totalSteps = all.length;
  
  return (
    <section
      className="relative rounded-2xl border border-zinc-800"
      style={{ clipPath: "inset(0 round 1rem)" }}
    >
      {/* Sticky visual stage */}
      <div className="sticky top-0 z-0 h-[100svh] w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={active.step.bg}
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Background image */}
            <Image
              src={active.step.bg}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
              loading="eager"
            />
            {/* Scrim for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
          </motion.div>
        </AnimatePresence>

        {/* Attribution HUD (bottom-right) */}
        {active.step.bgCredit && (
          <div className="pointer-events-auto absolute bottom-0 right-0 z-20 p-3 sm:p-4">
            <div className="max-w-[84vw] rounded-xl bg-black/45 px-3 py-2 text-[11px] leading-snug text-zinc-200 backdrop-blur">
              <div className="truncate">
                <span className="font-medium">{active.step.bgCredit.label}</span>
                {active.step.bgCredit.author ? (
                  <span className="text-zinc-400"> · {active.step.bgCredit.author}</span>
                ) : null}
              </div>

              <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-zinc-300">
                <a
                  href={active.step.bgCredit.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/30 underline-offset-2 hover:decoration-white/70"
                >
                  {active.step.bgCredit.sourceName}
                </a>

                {active.step.bgCredit.license ? (
                  active.step.bgCredit.licenseUrl ? (
                    <a
                      href={active.step.bgCredit.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-white/30 underline-offset-2 hover:decoration-white/70"
                    >
                      {active.step.bgCredit.license}
                    </a>
                  ) : (
                    <span>{active.step.bgCredit.license}</span>
                  )
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll steps */}
      <div className="relative z-10 -mt-[100svh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {chapterGroups.map((group) => (
            <section key={group.chapter.id} className="py-10 sm:py-12">
              <SectionHeader label={group.chapter.label} />

              {group.items.map((item) => {
                const index = indexById.get(item.step.id) ?? 0;

                return (
                  <StepCard
                    key={item.step.id}
                    // @ts-expect-error
                    item={item}
                    index={index}
                    total={totalSteps}
                    isActive={item.step.id === active.step.id}
                    onActivate={() => {
                      setActive((prev) =>
                        prev.step.id === item.step.id
                          ? prev
                          : { step: item.step, chapterIndex: item.chapterIndex, stepIndex: item.stepIndex }
                      );
                    }}
                  />
                );
              })}
            </section>
          ))}
        </div>

        <div className="h-24 sm:h-36" />
      </div>
    </section>
  );
}
