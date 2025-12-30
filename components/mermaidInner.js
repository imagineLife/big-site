import { useLayoutEffect, useRef, useId, useMemo, useState } from 'react';
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

export default function MermaidInner({
  chart,
  /** New optional knobs */
  // TODO: zoom?!
  zoom = false,
  scroll = true,
  className = '',
}) {
  const ref = useRef(null);
  const id = useId();

  const [open, setOpen] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState('');

  // Keep wrapper styles stable (avoid rerenders affecting layout)
  const wrapperStyle = useMemo(() => {
    if (!scroll) return { margin: '16px 0' };
    return {
      margin: '16px 0',
      overflowX: 'auto',
      overflowY: 'hidden',
      paddingBottom: 8,
      cursor: zoom ? 'zoom-in' : 'default',
    };
  }, [scroll, zoom]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        // Important: avoid “tiny diagram” scaling; prefer scroll instead
        flowchart: {
          useMaxWidth: false,
          nodeSpacing: 50,
          rankSpacing: 70,
        },
        themeVariables: {
          // Default readability bump; can be overridden with %%{init...}%%
          fontSize: '18px',
        },
        // If you ever use <a id="..."> anchors etc, loose is typically fine.
        // If your environment is strict, you can remove this.
        securityLevel: 'loose',
      });
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

        // Post-process SVG for layout/readability
        const svg = ref.current.querySelector('svg');
        if (svg) {
          svg.style.height = 'auto';
          svg.style.display = 'block';

          // If scroll is enabled, don't constrain width (let it overflow + scroll)
          if (scroll) {
            svg.style.maxWidth = 'none';
          } else {
            // If not scrolling, fill container width
            svg.style.width = '100%';
            svg.style.maxWidth = '100%';
          }

          // Store markup for click-to-zoom modal
          if (zoom) {
            setSvgMarkup(svg.outerHTML);
          }
        }
      } catch (err) {
        ref.current.innerHTML = `<pre>${err?.message ?? String(err)}</pre>`;
      }

      // Slight pause to allow SVG layout to finish
      setTimeout(done, 30);
    });
  }, [chart, id, scroll, zoom]);

  return (
    <>
      <div
        className={className}
        style={wrapperStyle}
        onClick={() => (zoom ? setOpen(true) : null)}
        role={zoom ? 'button' : undefined}
        tabIndex={zoom ? 0 : undefined}
        onKeyDown={(e) => {
          if (!zoom) return;
          if (e.key === 'Enter' || e.key === ' ') setOpen(true);
        }}
        aria-label={zoom ? 'Expand diagram' : undefined}
      >
        <div ref={ref} />
      </div>

      {zoom && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1400px, 95vw)',
              maxHeight: '90vh',
              overflow: 'auto',
              cursor: 'default',
            }}
          >
            <div
              style={{
                padding: 12,
              }}
              // Render the captured SVG markup
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          </div>
        </div>
      )}
    </>
  );
}
