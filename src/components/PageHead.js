import React, { Fragment } from 'react';
import k8sImg from './../../images/imgs/k8s.png';
import nodeImg from "./../../images/imgs/Node.png";
import bashImg from "./../../images/imgs/bash.png";
import dockerImg from "./../../images/imgs/docker.png";
import mongoImg from "./../../images/imgs/mongoDB.png"

function imgFromSlug(s) {
  if (s.includes('k8s')) return k8sImg;
  if (s.includes("node")) return nodeImg;
  if (s.includes('linux')) return bashImg;
  if (s.includes("docker")) return dockerImg;
  if (s.includes("mongo")) return mongoImg;
  return false
}

export default function PageHead({ title, excerpt, slug, words, tags }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: title,
    author: {
      "@type": "Person",
      name: "Eric (Jake) Laursen",
      url: "https://laursen.tech/about/",
    },
    description: excerpt,
    headline: title,
    wordCount: words || null,
    keywords: [...tags, "blog", "blog post", "blogpost"],
    inLanguage: "en-US",
  }

  const optionalImg = imgFromSlug(slug)
  if (optionalImg) {
    jsonLd.image = `https://laursen.tech${optionalImg}`
  }

    return (
      <Fragment>
        <title>{title || "Jake Laursen Blog"}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://laursen.tech/${slug}/`} />
        <link rel="canonical" href={`https://laursen.tech/${slug}/`} />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap-index.xml" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Fragment>
    )
}