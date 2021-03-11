import React from 'react';
import Helmet from 'react-helmet';

import useSiteMetadata from './../../hooks/use-site-metadata';

const PageHeader = () => {
  const { title, description } = useSiteMetadata();
  console.log('title');
  console.log(title);
  console.log('description');
  console.log(description);

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageHeader;
