import React from "react";
import { graphql } from "gatsby";
import Link from "../components/Link";
import { transparentize } from "polished";
import styled from "@emotion/styled";
import kebabCase from "lodash/kebabCase";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import { Layout, Wrapper, Header, Subline, SEO, PrevNext } from "../components";

const Content = styled.article`
  grid-column: 2;
  padding-top: 3rem;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding-top: 2rem;
  }
  p,
  ul,
  ol,
  code,
  pre code,
  .prism-code .token-line {
    font-size: 1.1rem;
    line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    @media (max-width: ${props => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;

    &:hover {
      a.anchor {
        opacity: 1;
      }
    }
  }
  a.anchor {
    position: absolute;
    left: -16px;
    opacity: 0;
    transition: opacity ease-in-out ${p => p.theme.transitions.normal};

    svg {
      transform: translateX(-0.5rem);
    }
  }
`;

const Title = styled.h1`
  position: relative;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 4px dotted
    ${p => transparentize(0.666, p.theme.colors.primary)};
  &:after {
    content: "";
    position: absolute;
    bottom: 2px;
    display: block;
    width: 100%;
    border-bottom: 4px dotted
      ${p => transparentize(0.666, p.theme.colors.primary)};
  }

  a {
    color: inherit;
  }
`;

const PostContent = styled.div`
  margin-top: 4rem;

  a,
  code,
  pre code {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }
`;

const Post = ({
  pageContext: { slug, prev, next },
  data: { mdx: postNode }
}) => {
  const post = postNode.frontmatter;

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} article />
        <Header />
        <Content>
          <Title>
            <Link to={post.link || `/${slug}`}>{post.title}</Link>
          </Title>
          <Subline>
            {post.date} &mdash; {postNode.timeToRead} Min Read &mdash;{" "}
            {(post.series || []).map((cat, i) => (
              <React.Fragment key={cat}>
                {"#"}
                <Link to={`/series/${kebabCase(cat || "")}`}>{cat}</Link>{" "}
              </React.Fragment>
            ))}
          </Subline>
          <PostContent>
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </PostContent>
        </Content>
      </Wrapper>
      <PrevNext prev={prev} next={next} />
    </Layout>
  );
};

export default Post;

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        link
        date(formatString: "MM/DD/YYYY")
        series
      }
      timeToRead
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`;
