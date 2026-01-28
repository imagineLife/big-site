'use client';

import * as React from 'react';

type ScrollSpyOptions = {
  rootMargin?: string; // controls when a section becomes "active"
  threshold?: number | number[];
};

export function useScrollSpy(
  sectionIds: string[],
  options: ScrollSpyOptions = {}
) {
  const { rootMargin = '-35% 0px -55% 0px', threshold = [0, 0.1, 0.2] } =
    options;

  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? '');
  const [progress, setProgress] = React.useState(0);

  // Create refs for each section
  const refs = React.useMemo(() => {
    const map = new Map<string, React.RefObject<HTMLElement>>();
    for (const id of sectionIds) map.set(id, React.createRef<HTMLElement>());
    return map;
  }, [sectionIds]);

  // IntersectionObserver → activeId
  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => refs.get(id)?.current)
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    // Track which observed sections are currently intersecting
    const intersecting = new Map<string, number>(); // id -> intersectionRatio

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!id) continue;

          if (entry.isIntersecting) {
            intersecting.set(id, entry.intersectionRatio);
          } else {
            intersecting.delete(id);
          }
        }

        // Choose the "best" active section among intersecting:
        // - prefer highest intersectionRatio
        // - if tie, prefer the one closest to top (smaller top value)
        let bestId = activeId;
        let bestScore = -1;
        let bestTop = Number.POSITIVE_INFINITY;

        for (const id of sectionIds) {
          const el = refs.get(id)?.current;
          const score = intersecting.get(id);
          if (!el || score == null) continue;

          const top = el.getBoundingClientRect().top;
          if (score > bestScore || (score === bestScore && top < bestTop)) {
            bestScore = score;
            bestTop = top;
            bestId = id;
          }
        }

        if (bestId && bestId !== activeId) setActiveId(bestId);
      },
      { root: null, rootMargin, threshold }
    );

    for (const el of elements) io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds, refs, rootMargin, JSON.stringify(threshold)]);

  //
  // Optional: overall scroll progress (0..1) for a “filled” rail
  //
  React.useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { activeId, progress, refs };
}
