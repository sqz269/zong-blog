/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'
import { Actions, GatsbyNode } from 'gatsby'

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
const tagsTemplate = path.resolve(`./src/templates/tags.tsx`)
const seriesTemplate = path.resolve(`./src/templates/series.tsx`)

type GraphQLResponse<TData> = {
  errors?: any;
  data?: TData;
};

type GraphQLFunction = <TData, TVariables = any>(
  query: string,
  variables?: TVariables
) => Promise<GraphQLResponse<TData>>;

const createBlogPages: (args: { graphql: GraphQLFunction, actions: Actions }) => Promise<void> = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql<Queries.AllMdxQuery>(`
    query AllMdx {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  data!.allMdx.nodes.forEach(node => {
    actions.createPage({
      path: node!.frontmatter!.slug!,
      component: `${blogPost}?__contentFilePath=${node.internal.contentFilePath}`, // highlight-line
      context: {
        id: node.id,
      },
    })
  })
}

const createBlogTagsPages: (args: { graphql: GraphQLFunction, actions: Actions }) => Promise<void> = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql<Queries.MdxTagsQuery>(`
  query MdxTags {
    allMdx {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
  `)

  const distinctTags = new Set<string>()
  data!.allMdx.nodes.forEach(node => {
    if (node!.frontmatter!.tags === null) {
      return
    }

    node!.frontmatter!.tags.forEach(tag => {
      distinctTags.add(tag!)
    })
  })

  distinctTags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: tagsTemplate,
      context: {
        tag,
      },
    })
  })
}


export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  await createBlogPages({ graphql, actions })
  await createBlogTagsPages({ graphql, actions })
}

// /**
//  * @type {import('gatsby').GatsbyNode['onCreateNode']}
//  */
// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// /**
//  * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
//  */
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `)
// }
