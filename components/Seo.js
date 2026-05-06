import Head from 'next/head';

export default function Seo({
  title,
  excerpt,
  description,
  tags = [],
  slug = '',
}) {
  const summary = excerpt || description || '';
  const normalizedSlug = String(slug).trim().replace(/^\/+|\/+$/g, '');
  const canonicalUrl = normalizedSlug
    ? `https://laursen.tech/${normalizedSlug}`
    : 'https://laursen.tech';

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    name: title,
    author: {
      '@type': 'Person',
      name: 'Eric (Jake) Laursen',
      url: 'https://laursen.tech/about/',
    },
    description: summary,
    headline: title,
    // wordCount: words || null,
    keywords: [...tags, 'blog', 'blog post', 'blogpost'],
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <title>{(title && `${title}`) || 'Jake Laursen Blog'}</title>
      <meta name="description" content={summary} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:site_name" content={'Jake Laursen Blog'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap.xml"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}
