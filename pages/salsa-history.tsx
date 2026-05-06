'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters } from '@/data/timeline';
import { Active, Item } from './../types/repo';
import SectionHeader from '@/components/salsa/SectionHeader';
import StepCard from '@/components/salsa/StepCard';
import Head from 'next/head';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { TimelineRail } from '@/components/TimelineRail';

function buildChapterGroups() {
  return chapters.map((chapter, chapterIndex) => {
    const items: Array<Item> = chapter.steps.map((step, stepIndex) => ({
      step,
      chapterIndex,
      stepIndex,
      chapterId: chapter.id,
      chapterLabel: chapter.label,
      chapterDescription: chapter.description,
    }));

    return { chapter, items };
  });
}

const chapterGroups = buildChapterGroups()
const all = chapterGroups.flatMap((group) => group.items);
const indexById = new Map<string, number>(
  all.map((item, index) => [item.step.id, index])
);

export default function ScrollyTimeline() {
  const [active, setActive] = React.useState<Active>(() => ({
    step: all[0].step,
    chapterIndex: all[0].chapterIndex,
    stepIndex: all[0].stepIndex,
  }));

  // console.log('active')
  // console.log(active)
  
  const totalSteps = all.length;
  const ids = React.useMemo(
    () => all.map((s) => `${s.chapterId}-step-${s.step.id}`),
    []
  );
  const { activeId, progress, refs } = useScrollSpy(ids);
  
  const slug = 'salsa-history';
  const title = 'A History of Salsa Music: Cuba, New York City, and the Global Dance Floor';
  const excerpt =
    "An interactive timeline of salsa’s roots in Afro-Caribbean music, Cuba’s son and mambo eras, the New York City salsa explosion, and salsa’s global spread—plus musician spotlights with Spotify listening embeds.";

  const canonicalUrl = `https://laursen.tech/${slug}`;
  const ogImage = 'https://laursen.tech/images/history-of-salsa/og.jpg';

  // If you have a real publish date, use it. Otherwise omit datePublished/dateModified.
  const datePublished = '2026-01-01';
  const dateModified = '2026-01-11';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: title,
    name: title,
    description: excerpt,
    url: canonicalUrl,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Jake Laursen',
      url: 'https://laursen.tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jake Laursen Blog',
      url: 'https://laursen.tech',
      // Optional: add a logo you control (recommended if you have one)
      // logo: {
      //   '@type': 'ImageObject',
      //   url: 'https://laursen.tech/images/logo.png',
      // },
    },
    image: [
      ogImage,
    ],
    datePublished,
    dateModified,
    // Helpful for discovery. Keep these tight and relevant.
    keywords: [
      'salsa music',
      'history of salsa',
      'Afro-Cuban music',
      'son cubano',
      'mambo',
      'boogaloo',
      'Fania Records',
      'New York City salsa',
      'Latin music history',
      'Latin dance',
    ],
    // Optional but nice if you have a hero image caption:
    // thumbnailUrl: ogImage,
  };
  
  return (
    <>
    <Head>
      <title>{title}</title>

      <meta name="description" content={excerpt} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:site_name" content="Jake Laursen Blog" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="History of Salsa Music timeline" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
      <meta name="twitter:image" content={ogImage} />

      {/* Cache controls (fine to keep if you want) */}
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />

      {/* Sitemap link (optional; not required for SEO, but harmless) */}
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <section
      className="relative"
    >

      <div className="hidden lg:block">
        <TimelineRail
          items={all.map(({ chapterLabel, chapterId, step }) => ({
            id: `${chapterId}-step-${step.id}`,
            dateLabel: chapterLabel,
            chapterId: chapterId,
            stepId: step.id,
          }))}
          activeId={activeId}
          progress={progress}
        />
      </div>
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
                <span className="font-medium">
                  {active.step.bgCredit.label}
                </span>
                {active.step.bgCredit.author ? (
                  <span className="text-zinc-400">
                    {' '}
                    · {active.step.bgCredit.author}
                  </span>
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {chapterGroups.map((group) => {
            return (
            <section key={group.chapter.id} className="py-10 sm:py-12" id={`group-${group.chapter.id}`}>
              <SectionHeader label={group.chapter.label} />

              {group.items.map((item) => {
                const index = indexById.get(item.step.id) ?? 0;
                const scrollId = `${group.chapter.id}-step-${item.step.id}`;

                return (
                  <StepCard
                    groupId={group.chapter.id}
                    key={item.step.id}
                    item={item}
                    index={index}
                    total={totalSteps}
                    isActive={item.step.id === active.step.id}
                    scrollRef={refs.get(scrollId)}
                    onActivate={() => {
                      setActive((prev) =>
                        prev.step.id === item.step.id
                          ? prev
                          : {
                              step: item.step,
                              chapterIndex: item.chapterIndex,
                              stepIndex: item.stepIndex,
                            }
                      );
                    }}
                  />
                );
              })}
            </section>
          )
          })}
        </div>

        <div className="h-24 sm:h-36" />
      </div>
    </section>
    </>
  );
}
