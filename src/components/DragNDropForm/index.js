import React, { forwardRef } from 'react';

export default forwardRef(function DragDDropFile({
  handleDrag,
  dragActive,
  onButtonClick,
  handleDrop,
  handleFile
}, ref) {
  
  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files)
    }
  }

  return (
    <form onDragEnter={handleDrag} onSubmit={e => e.preventDefault()}>
      <input ref={ref} type="file" multiple={true} onChange={handleChange} />
      <label
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  )
})