import React, { useEffect } from "react";
import { themeChange } from 'theme-change'
import { Link, PageProps, graphql } from "gatsby"

import Seo from "../components/seo"
import NavBar from "../components/navbar"
import BlogOverviewEntry from "../components/blog-entry"
import ThemeProvider from "../components/theme-provider";

const BlogIndex: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data, location }) => {
  const posts = data.allMdx.nodes

  const allUniqueTags = new Set<string>()
  for (const post of posts) {
    if (post!.frontmatter!.tags === null) {
      continue
    }

    for (const tag of post!.frontmatter!.tags) {
      allUniqueTags.add(tag!)
    }
  }

  const allUniqueSeries = new Set<string>()
  for (const post of posts) {
    allUniqueSeries.add(post!.frontmatter!.series!)
  }

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to "content/blog" (or the
        directory you specified for the "gatsby-source-filesystem" plugin in
        gatsby-config.js).
      </p>
    )
  }

  return (
    <ThemeProvider>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">

          <div className="col-start-2 col-span-10">
            <NavBar />
          </div>

          <div className="col-start-2 col-span-6">
            <ol style={{ listStyle: `none` }}>
              {
                posts.map(post => {
                  const title = post!.frontmatter!.title || post!.frontmatter!.slug
                  return (
                    <li key={post!.frontmatter!.slug} className="border-b border-gray-300 last:border-b-0 pb-4 mb-4">

                      <BlogOverviewEntry
                        key={post!.frontmatter!.slug}
                        title={title!}
                        date={post!.frontmatter!.date!}
                        description={post!.frontmatter!.description!}
                        slug={post!.frontmatter!.slug!}
                        tags={post!.frontmatter!.slug as unknown as string[]}
                        series="series1"
                      />
                    </li>
                  )
                })
              }
            </ol>
          </div>

          <div className="col-start-9 col-span-3">
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Series</h2>
                <div className="card-actions">
                  {
                    Array.from(allUniqueSeries).map(series => {
                      return <Link to={`/series/${series}`} className="badge badge-lg badge-primary badge-outline">{series}</Link>
                    })
                  }
                </div>
              </div>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Tags</h2>
                <div className="card-actions">
                  {
                    Array.from(allUniqueTags).map(tag => {
                      return <Link to={`/tags/${tag}`} className="badge badge-lg badge-primary badge-outline">{tag}</Link>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
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
        tags
        series
      }
    }
  }
}`
