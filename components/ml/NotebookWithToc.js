import { useEffect, useMemo, useRef, useState } from 'react';
import { IpynbRenderer } from 'react-ipynb-renderer';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function NotebookWithToc({ ipynb }) {
  const notebookRef = useRef(null);
  const [tocItems, setTocItems] = useState([]);

  useEffect(() => {
    const root = notebookRef.current;
    if (!root) return;

    const assignHeadingAnchors = () => {
      const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const slugCounts = new Map();
      const nextToc = [];

      headings.forEach((heading, index) => {
        const text = (heading.textContent || '').trim();
        if (!text) return;

        const level = Number(heading.tagName.slice(1));
        const baseSlug = slugify(text) || `section-${index + 1}`;
        const seen = slugCounts.get(baseSlug) || 0;
        slugCounts.set(baseSlug, seen + 1);
        const id = seen === 0 ? baseSlug : `${baseSlug}-${seen + 1}`;

        heading.id = id;
        nextToc.push({ id, text, level });
      });

      setTocItems(nextToc);
    };

    assignHeadingAnchors();
    const timeoutId = window.setTimeout(assignHeadingAnchors, 120);

    return () => window.clearTimeout(timeoutId);
  }, [ipynb]);

  const tocList = useMemo(
    () => (
      <ul className="notebook-toc-list">
        {tocItems.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${Math.max(item.level - 1, 0) * 0.75}rem` }}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    ),
    [tocItems]
  );

  return (
    <section className="notebook-toc-layout">
      {tocItems.length > 1 && (
        <>
          <details className="notebook-toc-panel notebook-toc-panel-mobile">
            <summary className="notebook-toc-title notebook-toc-summary">Table Of Contents</summary>
            {tocList}
          </details>
          <aside className="notebook-toc-panel notebook-toc-panel-desktop">
            <h2 className="notebook-toc-title">Table Of Contents</h2>
            {tocList}
          </aside>
        </>
      )}
      <article ref={notebookRef} className="notebook-toc-content">
        <IpynbRenderer ipynb={ipynb} />
      </article>
    </section>
  );
}
