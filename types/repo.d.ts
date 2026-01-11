export type TimelineStepAccent = 'roots' | 'cuba' | 'nyc' | 'global' | 'modern';

export type SpotifyEmbed = {
  kind: 'album' | 'track' | 'playlist' | 'artist';
  title?: string;
  url?: string;
  openUrl?: string;
  embedUrl?: string; // e.g. https://open.spotify.com/embed/album/<id>
  note?: string; // optional short context shown in UI if you want
};

export type BgCredit = {
  label: string; // short label you show in HUD/footer
  sourceName: string; // e.g. "Wikimedia Commons"
  sourceUrl: string; // file page URL (NOT the image CDN URL)
  author?: string;
  license?: string; // e.g. "CC BY 4.0", "Public Domain Mark 1.0"
  licenseUrl?: string; // e.g. https://creativecommons.org/licenses/by/4.0
};

export type TimelineMusician = {
  hide?: boolean; // if true, don’t show the section
  name: string;
  role?: string; // instrument/role
  why?: string; // 1–2 lines: why this musician matters *for this step*
  spotifyEmbeds?: SpotifyEmbed[]; // optional: per-musician embed suggestions
};

export type TimelineStep = {
  id: string;
  dateLabel: string;
  title: string;
  body: string;

  bg: string; // can be /public path OR remote URL
  bgCredit?: BgCredit;

  accent: TimelineStepAccent;

  // Optional “deeper” metadata (your StepCard collapsibles already use these)
  musicalImpact?: string[];
  instrumentation?: string[];
  relatedStyles?: string[];

  keyMusicians?: TimelineMusician[];

  // Optional: lets you visually differentiate musician cards later
  stepType?: 'event' | 'musician';
};

export type TimelineChapter = {
  id: string;
  label: string;
  description: string;
  steps: TimelineStep[];
};

// These are used by ScrollyTimeline.tsx
export type Active = {
  step: TimelineStep;
  chapterIndex: number;
  stepIndex: number;
};

export type Item = {
  step: TimelineStep;
  chapterIndex: number;
  stepIndex: number;
  chapterLabel: string;
  chapterDescription: string;
};
