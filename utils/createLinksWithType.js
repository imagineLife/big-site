import React from 'react';
import SocialLink from '../components/socialLink';

export default function createLinksWithType({ thisType }) {
  return function createSocialLinks({ frontmatter: { excerpt, slug, title } }) {
    return (
      <SocialLink
        slug={slug}
        title={title}
        excerpt={excerpt}
        key={`${thisType}-toc-${slug}`}
      />
    );
  };
}
