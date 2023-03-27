import React from 'react';
import SocialLink from './socialLink';

function createLinksWithType({ thisType }) {
  return function createSocialLinks(
    {
      page: {
        overview: { slug, title, excerpt, parentDir, shortSlug },
      },
    },
    pageIdx
  ) {
    let innerSlug = thisType.includes('k8s-in-depth') ? `k8s/${shortSlug}` : slug
    // if (parentDir === 'docker') innerSlug = `docker/${innerSlug}`
      return (
        <SocialLink
          slug={innerSlug}
          title={title}
          excerpt={excerpt}
          key={`${thisType}-toc-${pageIdx}`}
        />
      )
  }
}

export default createLinksWithType
