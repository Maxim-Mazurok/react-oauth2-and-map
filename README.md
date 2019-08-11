# ToDo:

- [x] Configure webpack with babel and plugins
- [x] Add and configure TypeScript, SCSS
- [x] Add linting and code style solutions, such as eslint/gts
- [x] Set up Jest and react-testing-library for running tests
- [x] Probably, use Bootstrap CSS framework (as on the myNewMotion)
- [x] Get rif of the Bootstrap because it's an overhead for such a simple layout, but leave it as a branch for historical purpose
- [ ] Login form component
  - [x] Basic markup
  - [x] Media queries
  - [ ] Tests
- [ ] Map component
  - [x] Basic markup
  - [ ] Probably, DIY
  - [ ] Tests
- [ ] User info component + tests
- [ ] OAuth2 service + tests (mock)
- [ ] HTTP API service + tests (mock)
- [ ] Integration tests
- [ ] Cross-browser testing
- [ ] Accessibility testing
  - [ ] Think about the contrast of labels and button...
- [ ] Probably, no routing will be required (as seen on the myNewMotion, login and map are on the same page)
- [ ] Add Readme with instructions

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

- .gitignore - contains list of files ignored by git
- .nvmrc - contains node version, used by nvm
- package.json - node config file
- README.md - the file that you're reading ;)
