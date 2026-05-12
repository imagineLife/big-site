import type { TimelineStep } from '../types/repo';

const MUSICIAN_SPOTLIGHT_PREFIX = /^Musician spotlight:\s*/i;

function normalizeLabel(text?: string | null) {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

function stripTrailingParenthetical(text: string) {
  return text.replace(/\s*\([^)]*\)\s*$/u, '').trim();
}

function stripTrailingDescriptor(text: string) {
  return text.replace(/\s+[—–-]\s+.+$/u, '').trim();
}

function toConciseTitle(title: string) {
  const normalized = normalizeLabel(title);
  const withoutParenthetical = stripTrailingParenthetical(normalized);
  const withoutDescriptor = stripTrailingDescriptor(withoutParenthetical);
  return normalizeLabel(withoutDescriptor || withoutParenthetical || normalized);
}

function extractSpotlightName(title: string) {
  if (!MUSICIAN_SPOTLIGHT_PREFIX.test(title)) {
    return null;
  }

  const stripped = normalizeLabel(title.replace(MUSICIAN_SPOTLIGHT_PREFIX, ''));
  const withoutDescriptor = stripTrailingDescriptor(stripped);
  const withoutParenthetical = stripTrailingParenthetical(withoutDescriptor);
  return normalizeLabel(withoutParenthetical || withoutDescriptor || stripped);
}

type TimelineRailLabelStep = Pick<
  TimelineStep,
  'railLabel' | 'title' | 'dateLabel' | 'stepType'
>;

export function resolveTimelineRailLabel(step: TimelineRailLabelStep) {
  const explicit = normalizeLabel(step.railLabel);
  if (explicit) {
    return explicit;
  }

  const title = normalizeLabel(step.title);
  const spotlightName = extractSpotlightName(title);
  const isMusicianStep = step.stepType === 'musician' || Boolean(spotlightName);

  if (isMusicianStep) {
    const subject = spotlightName || toConciseTitle(title);
    if (subject) {
      return `Spotlight: ${subject}`;
    }
  }

  const conciseTitle = toConciseTitle(title);
  if (conciseTitle) {
    return conciseTitle;
  }

  return normalizeLabel(step.dateLabel);
}

export function truncateTimelineRailLabel(label: string, maxLength = 36) {
  const normalized = normalizeLabel(label);
  if (normalized.length <= maxLength) {
    return normalized;
  }

  if (maxLength <= 1) {
    return '…';
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}
