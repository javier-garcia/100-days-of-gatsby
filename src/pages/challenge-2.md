---
title: "Challenge-2 (Day 1)"
date: "2020-04-12 00:30"
---

This second challenge consists in publishing the site. The way the site should be deploy is pushing in to a repository branch and automaticallu build it and publish it through a free hosting service.

![Do something great!](../images/image.jpg)

There are many options out there. For this, I choose Github as the repository and Netlify to build and publish. Then I redirected my a newly created subdomain of mine to the url indicated by Netlify where the website would be publish.

I conected Netlify to my Github repository and configured it to listen to changes in the _master_ branch. When some changes are pushed to this branch, Netlify will automatically build the project and publish the new version. A very nice and easy Continuous Deployment setup.

From now on, I will be working in a _develop_ branch and when I am ready I will merge the changes in master and push it.

<br />
<br />

## Resources

[Go to the official Gatsby Challenge 2 site](https://www.gatsbyjs.org/blog/100days/free-hosting/)
