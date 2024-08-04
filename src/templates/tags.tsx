import { graphql, PageProps } from "gatsby";
import React from "react";
import ThemeProvider from "../components/theme-provider";
import BlogOverviewEntry from "../components/blog-entry";

const TagsTemplate: React.FC<PageProps<Queries.TagsTemplateQuery>> = ({ data, pageContext }) => {
  const posts: any = data!.allMdx!.nodes;
  console.log(pageContext);
  return (
    <ThemeProvider>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">

          <div className="col-start-2 col-span-8">
            <ol>
              {posts.map((post: any) => (
                <li key={post!.frontmatter!.slug} className="border-b border-gray-300 last:border-b-0 pb-4 mb-4">
                  <BlogOverviewEntry
                    key={post!.frontmatter!.slug}
                    title={post!.frontmatter!.title!}
                    date={post!.frontmatter!.date!}
                    description={post!.frontmatter!.description!}
                    slug={post!.frontmatter!.slug!}
                    tags={post!.frontmatter!.tags!}
                    series="series1"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TagsTemplate;

export const pageQuery = graphql`
  query TagsTemplate($tag: String!) {
    allMdx(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      nodes {
        id
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
  }
`