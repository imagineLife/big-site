import React from "react"
import SocialLink from "./socialLink"

function createLinksWithType({ thisType }) {
  return function createSocialLinks({
    page: {
      overview: { slug, title, excerpt, parentDir, shortSlug },
    },
  }) {
    return (
      <SocialLink
        slug={slug}
        title={title}
        excerpt={excerpt}
        key={`${thisType}-toc-${slug}`}
      />
    )
  }
}

export default createLinksWithType
