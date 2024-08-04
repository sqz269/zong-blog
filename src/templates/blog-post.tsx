import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

const BlogPostTemplate: React.FC<PageProps<Queries.PostTemplateQuery>> = ({
  data,
  children,
}) => {
  const mdx = data!.mdx!;

  const title = mdx?.frontmatter?.title || `Title`
  const description = mdx?.frontmatter?.description || ``
  const series = mdx?.frontmatter?.series || ``
  const tags = mdx?.frontmatter?.tags || []

  const tableOfContents = mdx?.tableOfContents || { items: [] }

  return (
    <ThemeProvider>
      <div className="container mx-auto flex-col flex-wrap justify-center">
        <div className="flex-auto-flex flex-col justify-center">
          <Link to="/">&lt; Back to Home</Link>
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>

        <div className="flex justify-center">
          <article
            className="prose grow"
            itemScope
            itemType="http://schema.org/Article"
          >
            {children}
          </article>

          <aside className="container sticky overflow-y-auto order-1 md:order-2 flex justify-center">
            <h2>Table of Contents</h2>
            <ul>
              {tableOfContents.items.map((item, index) => (
                <li key={item.url}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </ThemeProvider>
  )
}

// Add SEO component
import Seo from "../components/seo";
import ThemeProvider from "../components/theme-provider";
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
      tableOfContents
    }
  }`;
