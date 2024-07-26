import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data, location }) => {
  const siteTitle = data!.site!.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <Layout title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <h1 className="col-start-2 text-4xl col-span-6">Zong's Blog</h1>

        <div className="col-start-2 col-span-6">
          <ol style={{ listStyle: `none` }}>
            {posts.map(post => {
              const title = post!.frontmatter!.title || post!.frontmatter!.slug
              return (
                <div className="card bg-base-100 card-compact	">
                  <div className="card-body">
                    <div className="card-title">
                      <h2>
                        <Link to={post.frontmatter.slug || post.slug}>
                          {title}
                        </Link>
                      </h2>
                    </div>
                    <small>{post.frontmatter.date}</small>

                    <p>{post.frontmatter.description}</p>
                  </div>
                </div>
              );
            })}
          </ol>
        </div>

        <div className="col-start-9 col-span-3">
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Series</h2>
              <div className="card-actions">
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Tags</h2>
              <div className="card-actions">

                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
                <div className="badge badge-lg badge-primary badge-outline"># Primary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
// export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
query IndexPage {
  site {
    siteMetadata {
      title
    }
  }
  allMdx(sort: {frontmatter: {date: DESC}}) {
    nodes {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        slug
      }
    }
  }
}
      `
