import React, { forwardRef, useState } from 'react';

export default forwardRef(function DragDDropFile({
  onButtonClick,
  handleFile,
  setLoaded
}, ref) {
  // drag state
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e?.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files, setLoaded)
    }
  }

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