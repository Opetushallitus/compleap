# CompLeap Proof-of-Concept

CompLeap Proof-of-Concept (POC).

## Technologies and development tools

- React (https://reactjs.org/) (views)
- webpack (https://webpack.js.org/) and Babel (https://babeljs.io/) (build)
- styled-components (https://www.styled-components.com/) (styles)
- JavaScript Standard Style (https://standardjs.com/) and ESLint (https://eslint.org/) (code style)

## Installing dependencies

```shell
npm i
```

Create `.env` file for environment variables by copying it from the example file:
```shell
cp .env.example .env
```

## Running locally

```shell
npm run start:dev
```

This starts up the development server (webpack-dev-server) and serves the app at http://localhost:8080/.

Alternatively, you can create a development build (`npm run build:dev`) and serve the files from the `dist` directory with some other HTTP server application. The production build can be created similarly by running `npm run build:prod`.

## Running tests

**All tests:**

```shell
npm run test
```

**Or by type:**

Puppeteer-based browser tests:
```shell
npm run test:ui
```

Component tests (Jest snapshots):
```shell
npm run test:snapshot
```

