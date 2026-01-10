import type { ReactNode } from "react";

export default function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[12px] text-zinc-200">
      {children}
    </span>
  );
}
