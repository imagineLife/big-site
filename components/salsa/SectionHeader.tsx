export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="sticky top-6 z-20 mb-5 sm:mb-6">
      <div className="w-full border-y border-white/10 bg-black/50 px-4 py-6 text-zinc-200 shadow-lg backdrop-blur sm:px-6">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-base underline">
          {label}
        </h2>
      </div>
    </div>
  );
}
