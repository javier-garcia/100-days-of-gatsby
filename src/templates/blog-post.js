import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function BlogPost({ data }) {
  const post = data.markdownRemark

  let featuredImgFluid = post.frontmatter.featuredImage
    ? post.frontmatter.featuredImage.childImageSharp.fluid
    : null

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        meta={[]}
      />
      <div>
        <h1>{post.frontmatter.title}</h1>
        {featuredImgFluid && <Img fluid={featuredImgFluid} />}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
    }
  }
`

export default BlogPost
