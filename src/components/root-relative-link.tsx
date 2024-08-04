import React, { FC } from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

interface RootRelativeLinkProps extends GatsbyLinkProps<any> {
  to: string;
}

const RootRelativeLink: FC<RootRelativeLinkProps> = ({ to, ...props }) => {
  const isHashOrQuery = to.startsWith('#') || to.startsWith('?');
  const rootRelativePath = isHashOrQuery ? to : to.startsWith('/') ? to : `/${to}`;

  // @ts-nocheck
  return <Link to={rootRelativePath} {...props} />;
};

export default RootRelativeLink;
