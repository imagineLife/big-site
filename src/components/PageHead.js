import React, { Fragment } from 'react';

export default function PageHead({title, excerpt, slug, words, tags }) {
  return (
    <Fragment>
      <title>{title || "Jake Laursen Blog"}</title>
      <meta name="description" content={excerpt} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`http://laursen.tech/${slug}`} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          name: title,
          author: {
            "@type": "Person",
            name: "Eric (Jake) Laursen",
            url: "http://laursen.tech/about",
          },
          description: excerpt,
          headline: title,
          wordCount: words || null,
          keywords: [...tags, "blog", "blog post", "blogpost"],
          inLanguage: "en-US",
        })}
      </script>
    </Fragment>
  )
}