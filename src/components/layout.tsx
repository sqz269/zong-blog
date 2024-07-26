import * as React from "react"
import { Link, PageProps } from "gatsby"
import { useLocation } from '@reach/router';
import NavBar from "./navbar";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const location = useLocation()
  const isRootPath = location.pathname === '/' // Check if the current path is the root path

  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <article className="prose">{children}</article>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
