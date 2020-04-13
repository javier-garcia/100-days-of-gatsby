---
title: "Challenge-1 (Day 1)"
date: "2020-04-12 00:15"
---

The first challenge consists on following the Gatsby fundamental and intermediate tutorials, with a total of 8 steps.

## 0. Set Up Your Development Environment

The first step consists on setting up the environment and creating our first Gatsby site using Gatsby CLI and an starter project.

As I already have all the requirement to start working with Gatsby (Node, Git and Gatsby-CLI) I jumped directly to create the Gatsby site. This I did with the command line:

```
gatsby new hundred-days-of-gatsby https://github.com/gatsbyjs/gatsby-starter-hello-world
```

This created the folder with the files of my brand new Gatsby Website. I tested all was working going into the project folder and executing the command

```
gatsby develop
```

After that, browsing to http://localhost:8000, I was able to see the result.

From here a opened the project in VS Code and from here I continued working on the code.

## 1. Get to Know Gatsby Building Blocks

I went through this unit very quickly as I alredy knew about JSX, React Components and other concepts. Interesting is to learn the Gatsby glossary as Pages and Layout Components and also getting to know some Gatsby built-in components as the Link component (very useful to build navigation menus).

I jump over the "Deploying a Gatsby site" as I knew this would be the second challenge of the series.

## 2. Introduction to Styling in Gatsby

Altough the tutorial site starts creating a new Gatsby site, I continue using the first once and build upon it.

I started creating a _global.css_ file with some global styling and also creating a _gatsby-browser.js_ file importing it. This teach Gatsby to globally load this css in any page.

The rest of the step is about styling components with CSS Modules (which Gatsby supports right out of the box), aplying it to a new created about page.

## 3. Creating Nested Layout Components

This part of the tutorial introduces the concept of plugins. The plugin in question is <a href="https://kyleamathews.github.io/typography.js/" target="_blank">Typography</a>.

To use a plugin, you must follow two steps:

1. Install it with npm:

```
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```

2. and then add it to the _gatsby-config.js_ file:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

Then, in case of Typography, you need to add a kind of configuration file _typography.js_ under the folder indicated in the config file (_src/utils/_) with the content:

```javascript
import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
```

This will apply some basic typographics styles to the content, depending on the loaded theme, in this case _fairyGateTheme_

After this the last part is to create the first layout component. This will contain the title, the main navigation and will wrap the rest of the content, adding some margins to it.
The the layout is applied to two new pages: about and contact.

## 4. Data in Gatsby

Thing get interesant here. GraphQL is presented at the begining of this step to later introduce the concepts of unstructured data vs GraphQL.

Also for some reason this unit introduces the CSS-in-JS emotion plugin. In the examples the CSS goes inline in the HTML code, I think it should be possible to extract it to a variable to make the code more lean and readable.

The first piece of data used is the site metadata in the gatsby-config, which can be received with a simple page query:

```
query {
    site {
      siteMetadata {
        title
      }
    }
  }
```

Later on the tutorial explains the difference between a page query and an static query and how the latest can be used to query data from a non-page component.

## 5. Source plugins

At the beginning of this tutorial, I learned about GraphiQL. I went really quickly through it, because I already knew it.

After that I was introduced to Gatsby Source plugin, which allow to get data from other data sources, adding new query possibilities to GraphQL.

The plugin used was _gatsby-source-filesystem_, which allow to query the files in the project, including data about file name, size, ...

First step is to install the plugin with

```
npm install --save gatsby-source-filesystem
```

Then it must be added to the _gatsby-config.js_ file under the section _plugins_.

Where i was done, I built a page to list the files information.

## 6. Transformer plugins

This part of the tutorial is about Transformer Plugins. This plugins take the inforation obtained from Source Plugins and transform it. For example from Markdown to HTML. This is the case of the plugin npm _gatsby-transformer-remark_

Again, first step is to install the plugin with

```
npm install --save atsby-transformer-remark
```

Then it must be added to the _gatsby-config.js_ file under the section _plugins_.

Then, as an example, I built an list with a preview of the Markdown files in the project, with an small excerpt of its content in the index page.

## 7. Programmatically create pages from data

This chapter explains how to create pages from data automatically. Two Gatsby APIs are introduced, _onCreateNode_ and _createPages_.

This two functions should be implemented inside the file _gatsby-node.js_. _onCreateNode_ will be called each time a new node is created. In this case it si used to add a new field _slug_ to each markdown node, based on the file name.

After that, in the _onCreatePages_ function. We retrieve the fields of all the markdown nodes (inclusive the new created _slug_) and for each result we create a new page with the function createPage and using a template component, implemented in the file _blog-post.js_, wich will receive the slug and from it will query and render the markdown node data.

Finally, the _index.js_ file will be updated adding a link to each element in the list to navigate to each post thanks to the newly created slug.

## 8. Programmatically create pages from data

Here we optimize the website SEO, performance following best practices. The first step is to build and serve the site in order to be able ro test it using Chrome Lighthouse Tool.

To build the site:

```
gatsby builds
```

And to serve it:

```
gatsby serve
```

This serve the site under http://localhost:9000. After running the audit, we get many recomendations.

1. Add a manifest file

This can be done automaticcaly with a gatsby plugin, _gatsby-plugin-manifest_. To install it:

```
npm install --save gatsby-plugin-manifest
```

And then adding it to _gatsby-config.js_ file:

```javascript
module.exports = {
  ...,
  plugins: [
    ...,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ]
}
```

2. Add offline support

In order to qualify as a PWA, a website must use a service worker. Gatsby will add one for us thanks to a plugin again, _gatsby-plugin-offline_. To insall it:

```
npm install --save gatsby-plugin-offline
```

And for adding ti to the _gatsby-config.js_ file:

```javascript
module.exports = {
  ...,
  plugins: [
    ...,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ]
}
```

3. Add page metadata
   The last step is to add metadata to the pages. We will be doing this with _React Helmet_

To install it and the Gatsby plugin:

```
npm install --save gatsby-plugin-react-helmet react-helmet
```

Then it must be as ever added to _gatsby-config.js_ file.

After that a seo.js component is created, which initializes all the header metas and other information, ant this is added to the _blog-post.js_ template.

Although it is not part of the tutorial I also added the SEO component to the _index.js_.

This should improve the audit puntuation.

<br />
<br />

## Resources

[Gatsby tutorials](https://www.gatsbyjs.org/tutorial/)<br />
[Go to the official Gatsby Challenge 1 site](https://www.gatsbyjs.org/blog/100days/start-blog/)

```

```
