To view the site go to: [https://dstl.github.io/Human-Interface-Horizons/](https://dstl.github.io/Human-Interface-Horizons/)

# Human Interface Horizons Tool

The Human Interface Horizon tool was produced by [Aleph Insights](https://www.alephinsights.com) as a formal deliverable of the HS 1.005 Optimising Human System Integration (OHSI) - Human Machine Interface (HMI) - Future System Design for the [Defence Science and Technology Laboratory (Dstl)](https://www.gov.uk/government/organisations/defence-science-and-technology-laboratory). It was delivered as part of the [Human Social Science Research Capability (HSSRC)](https://www.baesystems.com/en-uk/product/human-and-social-science-research-capability--hssrc-).

It represents an explorable resource that presents information about emerging human-machine interface technologies and the future environment in which they might be used, with a particular focus on the defence and security setting. 

## Team
The production of the tool was led by [Aleph Insights](https://www.alephinsights.com). Some of the contributing analysis was carried out by researchers at the [University of Nottingham’s Human Factors Research Group](https://www.nottingham.ac.uk/research/groups/human-factors-research-group/). The artwork was produced by [MonkeysVsRobots](https://www.monkeysvsrobots.co.uk/). Web development support was provided by [Northlink Digital](https://www.northlink.digital/).

## Stack
This project is built using the following stack:
- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/)

Visualisations are custom built with [d3](https://d3js.org/)

Hosting is provided by GitHub Pages.

# Build and Deploy Instructions

## Package Manager
This project uses [**yarn**](https://yarnpkg.com/) to manage the packages. **Yarn** is an alternaltive to **npm**. Please avoid using **npm**. 

## Project Formatting
This project uses [**prettier**](https://prettier.io/) to maintain consistant project formmating. Please ensure you have this extension **Enabled** on your IDE for this particular project. Check out this [Link](https://prettier.io/docs/en/editors.html) for support.

## Prepare your Development Environment
Follow the these steps to prepare your development environment.
1. Install Nodejs - version 14 or newer
    - Download [here](https://nodejs.org/en/download/)
1. Install yarn 
    - `npm install -g yarn` 
1. Make sure you have a suitable IDE installed. We recommend [VS Code](https://code.visualstudio.com/)
    - Ensure you have the [prettier](https://prettier.io/docs/en/editors.html) extention installed.
1. Clone this repository to your local machine

## Run Locally
To run a local hosted version for testing and debugging, follow these steps:

1. Fresh install from newly cloned repo. This will install all packages needed for the build. This step is only needed once when you clone the repo. 
    * `$ yarn`
1.  Start the development server 
    * `$ yarn develop`
1. Start a 'production-like' local server for testing
    * `$ yarn deploy-local`

## Deploy to Git Pages
### Deployment
The tool uses a nodejs module, `gh-pages`, to manage deployment to GitHub Pages.

`$ yarn deploy`

### GitHub repository settings
The repository must be configured to publish github pages:
1) Make sure the repo is public
1) Go to "**Settings**" for the repository
1) In the "**GitHub Pages**" section, select the branch "**gh-pages**" as the source. And "**/**" as the root

For more information see: [How Gatsby Works with GitHub Pages](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)

# Licence and Copyright
**Code**: [MIT License](LICENCE)

**Content**: © Crown copyright (2021), Dstl. This material is licensed under the terms of the Open Government Licence except where otherwise stated. To view this licence, visit the [licence page](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) or write to the Information Policy Team, The National Archives, Kew, London TW9 4DU, or email: [psi@nationalarchives.gsi.gov.uk](mailto:psi@nationalarchives.gsi.gov.uk?subject=Crown%20copyright).​

**Illustrations**: by [Monkeys vs Robots](https://www.monkeysvsrobots.co.uk/)