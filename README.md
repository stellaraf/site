<div align="center">
  <br/>
  <img src="https://res.cloudinary.com/stellaraf/image/upload/v1604277355/stellar-logo-gradient.svg" width=300 />
  <br/>
  <h3>stellar.tech Website Source Code</h3>
  <br/>

[![Tests](https://img.shields.io/github/workflow/status/stellaraf/site/Tests?label=Tests&style=for-the-badge)](https://github.com/stellaraf/site/actions?query=workflow%3A%Tests%22)

[![Build](https://img.shields.io/github/workflow/status/stellaraf/site/Build?label=Build&style=for-the-badge)](https://github.com/stellaraf/site/actions?query=workflow%3A%Build%22)

</div>

# Branches

| Branch | Function                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| `main` | Production, commits auto build to production @ [stellar.tech](https://stellar.tech).                               |
| `next` | Development, commits auto build to development environment @ [preview.stellar.tech](https://preview.stellar.tech). |

# Project

This project was developed with the following major libraries:

- [ReactJS](https://github.com/facebook/react)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://github.com/chakra-ui/chakra-ui/)

## Development

To start the dev server, run `yarn dev` from the project directory, and the development server will be available at [http://localhost:3000](http://localhost:3000)

## Production

To create a production build, run `yarn build` from the project directory. Then, start the production web server with `yarn start`.
