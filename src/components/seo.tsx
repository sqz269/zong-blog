import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SeoProps {
  description?: string;
  title: string;
  children?: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({ description, title, children }) => {
  const { site } = useStaticQuery<Queries.GetSiteMetadataQuery>(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site!.siteMetadata!.description;
  const defaultTitle = site!.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription!} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription!} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription!} />
      {children}
    </>
  );
};

export default Seo;
