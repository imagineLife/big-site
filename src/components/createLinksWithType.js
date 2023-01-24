import React from 'react';
import SocialLink from './socialLink';

function createLinksWithType({ thisType }) {
  return function createSocialLinks(
    {
      page: {
        overview: { slug, title, excerpt },
      },
    },
    pageIdx
  ) {
    return (
      <SocialLink
        slug={slug}
        title={title}
        excerpt={excerpt}
        key={`${thisType}-toc-${pageIdx}`}
      />
    )
  }
}

export default createLinksWithType
