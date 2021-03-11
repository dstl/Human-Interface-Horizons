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

This project uses [**yarn**](https://yarnpkg.com/) to manage the packages. **Yarn** is an alternative to **npm**. Please avoid using **npm**. 

This project uses [**prettier**](https://prettier.io/) to maintain consistent project formatting. Please ensure you have this extension enabled on your IDE for this particular project. Check out this [Link](https://prettier.io/docs/en/editors.html) for support.

----

# Build and Deploy Instructions

## Prepare your Development Environment
In order to be able to operate as a super-user there are a number of functions and tools that will be required. This will enable a super-user to make changes to content in the HIH tool. The necessary steps for preparing the development environment are included below.
- First, you will need to have editing permissions for this [Dstl GitHub repository](https://github.com/dstl/Human-Interface-Horizons) on which the HIH Tool is hosted.
- [Git for Windows](https://git-scm.com/download/win) installed on your machine. Ensure that your credentials are set up and you are able to access the repository from powershell.
- You will need to install [Nodejs](https://nodejs.org/en/download/ ) - Version 14 or newer.
- Make sure you have a suitable development tool installed - we recommend [VS Code](https://code.visualstudio.com/)
- Ensure you have the [prettier](https://prettier.io/docs/en/editors.html) extension installed.
You will also require a suitable editor for editing .csv files (e.g. Excel).
- Finally, once Nodejs is installed, install ‘yarn package manager’ using node package manager from PowerShell, using the command: `npm install -g yarn`

## Clone the repository
All data files are stored in the code repository for the project. To make changes you will need to edit a local copy of the repository and then rebuild the site. You will need to edit and build from a local copy of this repository. 

Navigate to a directory on your local machine where you want to work, open PowerShell and clone the repository using the following command: `git clone git@github.com:dstl/Human-Interface-Horizons.git`

Install local node packages required to build the project by running: `yarn install`

## Making Changes
The correct file must first be identified in order to ensure any amendments are reflected in the HIH tool. Changes can then be made to the .csv file in question, using an appropriate file such as Excel. This simply involves opening the local copy of the .csv file and making changes by selecting the appropriate cell/s and amending the content.

Ensure you do not move or rename any of these files.

## Build Test
Prior to deployment it is recommended that you perform a test build to check the site builds correctly and displays as intended. Once you are content that changes are correct, perform a test build in order to launch a 'production-like' local server for testing of the site using the command: `yarn cbs`

The cbs script (short for clean, build, serve) performs these functions sequentially.

An address (similar to http://localhost:9000) will be displayed in PowerShell. You will need to open this page in your browser to view the local build. You should check that the content has been changed and appears as required.

## Deploy to Git Pages
Pushing and committing the changes will enable the amended site to appear on the GitHub Pages site. To complete this final step, from the top level of the local repository run the following command to rebuild and publish the site to GitHub Pages in PowerShell: `yarn deploy`

## Commit changes to repository
To commit the changes made to the remote (GitHub) repository and allow this version to be built on in the future, the following steps should be followed in PowerShell:

Stage the changes: `git add .`

Commit the changes to the local repository: `git commit -m “insert name for the change for reference purposes”`

Push recent commits from the local repository to the remote repository: `git push`

## GitHub repository settings
The tool uses a nodejs module, gh-pages, to manage deployment to GitHub Pages. The repository must be configured to publish GitHub Pages. This only needs to be done once:
1) Make sure the repo is public
1) Go to "**Settings**" for the repository
1) In the "**GitHub Pages**" section, select the branch "**gh-pages**" as the source. And "**/**" as the root

For more information see: [How Gatsby Works with GitHub Pages](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)

----

# Licence and Copyright
**Code**: [MIT License](LICENCE)

**Content**: © Crown copyright (2021), Dstl. This material is licensed under the terms of the Open Government Licence except where otherwise stated. To view this licence, visit the [licence page](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) or write to the Information Policy Team, The National Archives, Kew, London TW9 4DU, or email: [psi@nationalarchives.gsi.gov.uk](mailto:psi@nationalarchives.gsi.gov.uk?subject=Crown%20copyright).​