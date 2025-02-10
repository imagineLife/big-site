import React, { memo } from 'react';

const ButtonBox = memo(function BtnBx({
  headDirection,
  count,
  enabled,
  onMouseDown,
  onMouseUp,
}) {
  return (
    <section id="centered-wrapper">
      <button
        enabled={enabled}
        className="mx-2 rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90 active:bg-amber-200 transition-colors disabled:bg-indigo-800"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {enabled === 'false' && 'Loading the starting model...'}
        {enabled === 'true' && `Collect ${headDirection}-position imgs`}
      </button>
      <p className="mx-2">Trained Image Count: {count}</p>
    </section>
  );
});

export { ButtonBox };
