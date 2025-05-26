import { useLayoutEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

// Shared render queue (across all MermaidInner instances)
const mermaidDiagramRenderQueue = [];
let renderingDiagram = false;

function enqueueRender(callback) {
  mermaidDiagramRenderQueue.push(callback);
  processQueue();
}

function processQueue() {
  if (renderingDiagram || mermaidDiagramRenderQueue.length === 0) return;
  renderingDiagram = true;
  const next = mermaidDiagramRenderQueue.shift();
  requestAnimationFrame(() => {
    next(() => {
      renderingDiagram = false;
      processQueue();
    });
  });
}

export default function MermaidInner({ chart }) {
  const ref = useRef(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (!mermaidInitialized) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      mermaidInitialized = true;
    }

    enqueueRender(async (done) => {
      if (!ref.current) return done();

      // Inject placeholder and render
      ref.current.innerHTML = `<div class="mermaid">${chart}</div>`;
      try {
        await mermaid.run({
          nodes: ref.current.querySelectorAll('.mermaid'),
        });
      } catch (err) {
        ref.current.innerHTML = `<pre>${err.message}</pre>`;
      }

      // Add a slight pause to allow SVG layout to finish
      setTimeout(done, 30); // Can tweak this for perf
    });
  }, [chart, id]);

  return <div ref={ref} />;
}
