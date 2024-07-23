import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import Layout from "../components/layout"

const BlogPostTemplate: React.FC<PageProps<Queries.PostTemplateQuery>> = ({
  data,
  children,
}) => {
  const mdx = data!.mdx!;

  const title = mdx?.frontmatter?.title || `Title`

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center">
      <article
        className="prose flex-auto relative"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{title}</h1>
        </header>
        {children}
        <hr />
      </article>

      <div className="mt-4 md:mt-0 md:ml-4">
        Blog Side Panel
      </div>
    </div>
  )
}

// Add SEO component
import Seo from "../components/seo";
export const Head = ({ data }: { data: Queries.PostTemplateQuery }) => {
  const mdx = data!.mdx!;
  const title = mdx!.frontmatter!.title || `Title`;
  const description = mdx!.frontmatter!.description || ``;

  return (
    <Seo title={title} description={description} />
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PostTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        series
        tags
        description
      }
    }
  }`;
