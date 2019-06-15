import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/blog-post-layout"
import { FluidObject } from "gatsby-image"

interface IBlogPost {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        cover: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }
}

export default ({ data }: IBlogPost) => {
  const node = data.markdownRemark
  const cover =
    node.frontmatter.cover && node.frontmatter.cover.childImageSharp
      ? node.frontmatter.cover.childImageSharp.fluid
      : null

  return (
    <Layout title={node.frontmatter.title} cover={cover}>
      {
        // tslint:disable:react-no-dangerous-html
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
        // tslint:enable:react-no-dangerous-html
      }
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $coverImageMaxWidth: Int!) {
    contentfulPost( slug: { eq: $slug } ) {
      title
      author
      content {
        child
      }
    }
  }
`
