---
title: "Challenge-3 (Day 2)"
date: "2020-04-15 00:00"
---

In this challenge the goal is to learn how to use images in Gatsby websites.

There is two parts: how to add a feature image to markdown posts and how to add images directly into the markdown.
<br /><br />

## Part 1. Adding a featured image to the markdown posts

For the first part, the plugin _gatsby-plugin-sharp_ and the transformer _gatsby-transformer-sharp_ are used. Also _gatsby-image_ is used in order to add an image component for showing the image. To install them:

```
npm install --save gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

Then a _featuredImage_ property to can be added to the markdown files like this.

```
---
title: "Challenge-1 (Day 1)"
date: "2020-04-12 00:15"
featuredImage: "../images/image.jpg"
---

...
```

Next step is to query for the image in the blog post template:

```
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
```

Lastly we import the _Img_ component from _gatsby-image_, get the _fluid_ member from the previous query and use it in the _JSX_ code:

```
import Img from "gatsby-image"

...

let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

...

<Img fluid={featuredImgFluid} />
```

<br />

## Part 2. Inserting images directly into the marksdown content

The second part is about including images directly into the markdown content. To do this, the plugin _gatsby-remark-images_ is used. It can be used with many markdown plugins or transformers, like _gatsby-plugin-mdx_ but, as we are using _gatsby-transformer-remark_ the configuration would be like this:

```
...

{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 800,
        },
      },
    ],
  },
},

...

```

After this, we can insert images with standar markdown like this:

```
![Do something great!](../images/image.jpg)
```
