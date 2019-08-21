# ToDo:

- [x] Configure webpack with babel and plugins
- [x] Add and configure TypeScript, SCSS
- [x] Add linting and code style solutions, such as eslint/gts
- [x] Set up Jest and react-testing-library for running tests
- [x] Probably, use Bootstrap CSS framework (as on the myNewMotion)
- [x] Get rif of the Bootstrap because it's an overhead for such a simple layout, but leave it as a branch for historical purpose
- [x] Probably, no routing will be required (as seen on the myNewMotion, login and map are on the same page)
- [x] Integration tests
  - [x] Login Form
  - [x] Header (login + user info)
  - [x] Map
- [ ] Login form component
  - [x] Basic markup
  - [x] Media queries
  - [x] Add loading indicator, disable fields
  - [x] Replace react-media with MediaQueryListListener
  - [ ] (future) Email/password validation/errors
  - [ ] (future) Save token
  - [ ] (future) Hide form on mobile with tiny VH
  - [ ] (future) Debounce form loading
  - [ ] Unit tests
    - [x] Desktop
    - [x] Mobile
    - [x] Generic
      - [ ] (future) Maybe add test for mediaQuery with mock
- [ ] Map component
  - [x] Basic markup
  - [x] Probably, DIY
  - [x] Maybe mark "Adresgegevens nog niet verwerkt" as greyed out
  - [x] Markers for retina
  - [x] Unit tests
  - [ ] (future) Add "locate me" button
  - [ ] (low priority) - partially solved by loading simultaneously. Maybe load map only after getting charging points to eliminate default map flash
- [ ] User info component
  - [x] Basic markup
  - [ ] (!!!) Unit tests
- [ ] Oauth2 service
  - [x] Basic implementation
  - [ ] (!!!) Unit tests
- [ ] HTTP API service
  - [x] Basic implementation
  - [ ] (!!!) Unit tests
- [ ] Cross-browser testing
  - [ ] (future) Determine which polyfills are actually required (reduce bundle size)
  - [ ] (!!!) Basic testing
- [ ] Accessibility testing
  - [ ] (future) Think about the contrast of labels and button...
  - [ ] (!!!) Basic testing (pa11y)
- [ ] (!!!) Add Readme with instructions
- [ ] (!!!) Add more comments

# Getting Started

## Setup Environment

### Install specific node and npm versions (recommended, but optional step)

1. Install [nvm](https://github.com/nvm-sh/nvm#install--update-script) or [nvm-windows](https://github.com/coreybutler/nvm-windows) depending on your OS.
   ```shell script
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
   ```
1. Install node version from `.nvmrc` file (recommended optional step):
   ```shell script
   nvm install
   ```
1. Install npm version from `package.json` -> `engines.npm`:

   ```shell script
   npm i -g npm@$(grep '"npm"' package.json | cut -d '"' -f 4)
   ```

## Build and Run

1. Install dependencies (both prod and dev are required for build, overwrite NODE_ENV from env variables if it's `production`):
   ```shell script
   NODE_ENV=development npm install
   ```
1. Build (for production):
   ```shell script
   npm run build
   ```
   or Run development server with live-reload:
   ```shell script
   npm start
   ```

# FAQ

## Project Structure

- .env - environment variables, used to configure the app
- .gitignore - contains list of files ignored by git
- .nvmrc - contains node version, used by nvm
- .prettierignore - used to ignore JS compiled from TS
- fake-server.ts - emulates real API endpoint, used to get charging points
- jest.config.js - used for testing
- package.json - node config file
- package-lock.json - another node config file with precise package versions
- prettier.config.js - used to format the code
- README.md - the file that you're reading ;)
- sample-json-charge-points.json - JSON from the assignment with charge points, used by fake-server
- stylelint.config.js - used for linting .scss files
- tsconfig.json - used for compiling TypeScript
- tslint.json - used for linting TypeScript
- webpack.config.js - used for building the app
