export const ACCENTS = ['roots', 'cuba', 'nyc', 'global', 'modern'] as const;

export type Accent = (typeof ACCENTS)[number];

export const accentToClasses: Record<string, { dot: string; pill: string }> = {
  roots: {
    dot: 'bg-amber-400',
    pill: 'bg-amber-400/15 text-amber-200 border-amber-400/30',
  },
  cuba: {
    dot: 'bg-emerald-400',
    pill: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
  },
  nyc: {
    dot: 'bg-sky-400',
    pill: 'bg-sky-400/15 text-sky-200 border-sky-400/30',
  },
  global: {
    dot: 'bg-fuchsia-400',
    pill: 'bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-400/30',
  },
  modern: {
    dot: 'bg-rose-400',
    pill: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
  },
};

export default accentToClasses;
