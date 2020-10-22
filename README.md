# Technical Challenge

This is my solution to the proposed technical challenge.

I started by making a conversion of the repo to Typescript. The reason why I did this is related to one of the bullpoints in the challenge definition - structured approach to typing.

I preferred to use Typescript types instead of PropTypes as it takes advantage of Typescript compilation to make sure everything is in order before runtime.

On top of that it was a simple approach - logic only, no CSS added.

On the server I added the ability of searching with the help of a simple RegEx.
On the client I divided the application in 3 different components, Menu, MenuSummary and MenuPreview.

Menu: Where the request to the server happens and where I display the items available.
MenuSummary: When items are selected it displays how many items are selected and the corresponding data about dietaries.
MenuPreview: Shows the options selected with the ability of removing.

# Quick Start

Fork the repository, clone it to your local system, then:

## Install dependencies

yarn (or npm install)

## Start development server

yarn dev (or npm run dev)

## Run tests

yarn test (or npm run test)
