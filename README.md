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

## Running client app locally

```shell
npm run start:dev
```

This starts up the development server (webpack-dev-server) and serves the app at http://localhost:8080/.

Alternatively, you can create a development build (`npm run build:dev`) and serve the files from the `dist` directory with some other HTTP server application. The production build can be created similarly by running `npm run build:prod`.

For using the client with the recommendations API, see [below](#Connecting-from-the-client-app).

## Running recommendations API locally

To start up the recommendations API locally, run:

```shell
docker-compose build model-api
docker-compose up model-api
```

The API is now available at `localhost:8000`.

### Connecting from the client app

First, switch from mock API to the locally served API by changing the `API_ENDPOINT` environment variable from `mock` to `/match`.

To use the local recommendations API together with the client app (being served from e.g. the webpack-dev-server), both the API and an Nginx reverse proxy can be started by running:
```shell
docker-compose up
```

The client is now connected to the API can be accessed from `localhost:7000`.

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

Component tests:
```shell
npm run test:component
```

