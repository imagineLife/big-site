import React, { memo } from 'react';

const MemoCheckbox = memo(function Input({ enableChecked, onCheck }) {
  return (
    <>
      <input
        id="webcam-box"
        name="webcam-box"
        checked={enableChecked}
        onChange={onCheck}
        type="checkbox"
        className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white dark:text-black hover:bg-opacity-90"
      ></input>
      <label htmlFor="webcam-box">1. Enable Your Webcam</label>
    </>
  );
});

export { MemoCheckbox };
