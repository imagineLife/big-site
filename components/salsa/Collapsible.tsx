import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Small, accessible collapsible with good mobile spacing */
export default function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const id = React.useId();
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/10 bg-black/15">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-zinc-100">{title}</span>
        <span className="text-xs text-zinc-300">{open ? "Hide" : "Show"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm text-zinc-200">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
