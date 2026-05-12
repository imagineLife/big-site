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
  url?: string;
};

export type TimelineStep = {
  id: string;
  dateLabel: string;
  title: string;
  railLabel?: string;
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
  // Optional: reference into canonical rhythmic profiles (see RhythmicProfile below)
  rhythmicProfileId?: string;
  // Optional: small, per-step notes about groove/accents that augment the profile
  rhythmicNotes?: string;
};

export type TimelineChapter = {
  id: string;
  label: string;
  description?: string;
  steps: TimelineStep[];
};

export type RailItem = {
  id: string;
  dateLabel: string; // "1959", "Late 70s", etc.
  chapterId: string;
  stepId: string;
};

export type TimelineRailProps = {
  items: RailItem[];
  activeId: string;
  progress?: number; // 0..1 (optional)
};

export type RailShellProps = {
  children: React.ReactNode;
};

export type RailPanelProps = {
  children: React.ReactNode;
};

export type RailFillProps = {
  progress?: number;
};

export type RailDotListProps = {
  items: RailItem[];
  activeId: string;
  onJump: (id: string) => void;
  prefersReducedMotion: boolean;
};

export type RailDotItemProps = {
  item: RailItem;
  isActive: boolean;
  onJump: (id: string) => void;
  prefersReducedMotion: boolean;
};

export type RailDotLabelProps = {
  label: string;
  isActive: boolean;
  prefersReducedMotion: boolean;
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
  chapterId: string;
  chapterLabel: string;
  chapterDescription: string;
};

export type RhythmicProfile = {
  id: string; // canonical id (used in TimelineStep.rhythmicProfileId)
  name: string; // human label
  // primary accents in human-readable tokens (e.g. ["2", "4-and"]) for UI pills
  primaryAccents?: string[];
  // concise accent pattern string for machine/human reading (e.g. "1 - 2 - 3 - 4-&")
  accentPattern?: string;
  description?: string; // 1-2 lines describing feel and instrument emphasis
  notationHint?: string; // optional short notation or reference
  bpm?: {
    min: number;
    max: number;
    typical: number;
    feel: string;
    note?: string;
  };
  exampleUrls?: string[]; // optional external references (no audio files in repo by default)
};
