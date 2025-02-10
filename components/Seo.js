import Head from 'next/head';

export default function Seo({ title, excerpt, tags = [], slug = '' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: title,
    author: {
      '@type': 'Person',
      name: 'Eric (Jake) Laursen',
      url: 'https://laursen.tech/about/',
    },
    description: excerpt,
    headline: title,
    // wordCount: words || null,
    keywords: [...tags, 'blog', 'blog post', 'blogpost'],
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <title>{(title && `${title}`) || 'Jake Laursen Blog'}</title>
      <meta name="description" content={excerpt} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={'Jake Laursen Blog'} />
      <meta property="og:url" content={`https://laursen.tech/${slug}/`} />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <meta httpEquiv="pragma" content="no-cache" />
      <link rel="canonical" href={`https://laursen.tech/${slug}/`} />
      <link
        rel="sitemap"
        type="application/xml"
        title="Sitemap"
        href="/sitemap-index.xml"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}
