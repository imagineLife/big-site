'use client';

import * as React from 'react';

import {
  RailDotItemProps,
  RailDotLabelProps,
  RailDotListProps,
  RailFillProps,
  RailPanelProps,
  RailShellProps,
  TimelineRailProps,
} from '../types/repo';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

function RailShell({ children }: RailShellProps) {
  return (
    <aside
      aria-label="Timeline navigation"
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        width: 44,
      }}
    >
      {children}
    </aside>
  );
}

function RailPanel({ children }: RailPanelProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: 8,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {children}
    </div>
  );
}

function RailTrack() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: 12,
        bottom: 12,
        width: 2,
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.12)',
        borderRadius: 999,
      }}
    />
  );
}

function RailFill({ progress }: RailFillProps) {
  if (typeof progress !== 'number') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: 12,
        width: 2,
        height: `calc(${Math.round(progress * 100)}% * (100% - 24px) / 100)`,
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: 999,
      }}
    />
  );
}

function RailDotList({
  items,
  activeId,
  onJump,
  prefersReducedMotion,
}: RailDotListProps) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item) => (
        <RailDotItem
          key={`${item.id}-${item.dateLabel}`}
          item={item}
          isActive={item.id === activeId}
          onJump={onJump}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </ul>
  );
}

function RailDotItem({
  item,
  isActive,
  onJump,
  prefersReducedMotion,
}: RailDotItemProps) {
  return (
    <li style={{ position: 'relative', margin: '10px 0' }}>
      <button
        type="button"
        onClick={() => onJump(`${item.chapterId}-step-${item.stepId}`)}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Jump to ${item.dateLabel}`}
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          border: '1px solid rgba(0,0,0,0.25)',
          background: isActive ? 'rgba(0,0,0,0.75)' : 'white',
          display: 'block',
          margin: '0 auto',
          cursor: 'pointer',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          transition: prefersReducedMotion ? undefined : 'transform 180ms ease',
        }}
      />
      <RailDotLabel
        label={item.dateLabel}
        isActive={isActive}
        prefersReducedMotion={prefersReducedMotion}
      />
    </li>
  );
}

function RailDotLabel({
  label,
  isActive,
  prefersReducedMotion,
}: RailDotLabelProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 22,
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '6px 8px',
        borderRadius: 8,
        background: 'rgba(0,0,0,0.78)',
        color: 'white',
        fontSize: 12,
        whiteSpace: 'nowrap',
        opacity: isActive ? 1 : 0,
        pointerEvents: 'none',
        transition: prefersReducedMotion ? undefined : 'opacity 160ms ease',
      }}
    >
      {label}
    </div>
  );
}


// 
// ALL TOGETHER
// 
export function TimelineRail({ items, activeId, progress }: TimelineRailProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollToId = React.useCallback(
    (divId:string) => {
      const el = document.getElementById(divId);
      if (!el) return;

      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [prefersReducedMotion]
  );

  return (
    <RailShell>
      <RailPanel>
        <RailTrack />
        <RailFill progress={progress} />
        <RailDotList
          items={items}
          activeId={activeId}
          onJump={scrollToId}
          prefersReducedMotion={prefersReducedMotion}
        />
      </RailPanel>
    </RailShell>
  );
}

