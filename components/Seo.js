import Head from 'next/head';

export default function Seo({
  title,
  excerpt,
  description,
  metaDescription,
  tags = [],
  slug = '',
  jsonLdOverride,
  robots,
}) {
  const summary = metaDescription || excerpt || description || '';
  const resolvedTitle = title || 'Jake Laursen Blog';
  const normalizedSlug = String(slug).trim().replace(/^\/+|\/+$/g, '');
  const canonicalUrl = normalizedSlug
    ? `https://laursen.tech/${normalizedSlug}`
    : 'https://laursen.tech';

  const defaultJsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    name: resolvedTitle,
    author: {
      '@type': 'Person',
      name: 'Eric (Jake) Laursen',
      url: 'https://laursen.tech/about/',
    },
    description: summary,
    headline: resolvedTitle,
    // wordCount: words || null,
    keywords: [...tags, 'blog', 'blog post', 'blogpost'],
    inLanguage: 'en-US',
  };
  const jsonLd = jsonLdOverride || defaultJsonLd;

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={summary} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={summary} />
      <meta property="og:site_name" content={'Jake Laursen Blog'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={summary} />
      {robots && <meta name="robots" content={robots} />}
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
