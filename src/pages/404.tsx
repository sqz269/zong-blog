import * as React from "react"
import { graphql, PageProps } from "gatsby"

import Seo from "../components/seo"

const NotFoundPage: React.FC<PageProps<Queries.Page404Query>> = ({ data, location }) => {
  const siteTitle = data!.site!.siteMetadata!.title!

  return (
    <>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query Page404 {
    site {
      siteMetadata {
        title
      }
    }
  }
`
