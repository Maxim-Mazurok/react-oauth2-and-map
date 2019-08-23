# Story

**DISCLAIMER**: For the past few weeks I've been working on this assignment pretty much full-time.
My goal was to make it as much production-ready as possible, while showcasing my skills by not overusing NPM packages.

## Why it's single page, and not separate login and map pages?

I used [my.newmotion.com](https://my.newmotion.com/) as a reference, because it looks pretty similar to the assignment requirements.
But in assignment, there were request for separate pages for login and map.
Because I was aiming to create real-life website, I put a lot of thought into it.
I thought that it would be much better UX to show the map without requiring to login first, and this approach is also used on myNewMotion.
So, I decided to go with the same approach.
Using separate login page would make sense in case if our first priority was to get new customer sign-ups,
because in this scenario if user wants to see the map - one have to sign up first.
I made an assumption that priority is to provide the best UX to both new and returning customers, so single page made more sense to me.

After deciding on that, I created a simple [layout mockup](./design/mockup.png).
I researched which technologies are used on myNewMotion, because it's very likely that I'll be dealing with them on the job.
I found out that it uses Bootstrap and I felt pretty comfortable using it, so I decided to go with it.
I've used [React Bootstrap](https://react-bootstrap.github.io/) package for my first prototype.
Down the road, I found out that my IDE doesn't understand React-Bootstrap types correctly.
I've opened [PR](https://github.com/react-bootstrap/react-bootstrap/pull/4221) but it was quite dirty solution.
Later, I tried to make it better, found another bug, but it seems like there's a bug in React typings that prevents me from implementing this fix.
Anyway, I also reported the [issue](https://youtrack.jetbrains.com/issue/WEB-40641?p=IDEA-220380) to the IDE bug tracker.

Because I was using myNewMotion as a reference, I needed to get rid of the rounded corners for inputs that bootstrap uses by default.
Obviously, there's a ton of ways to do this, but I thought that the best way is to set `$enable-rounded` variable in the SCSS version of Bootstrap to `false`.
I didn't find any way to do this from React-Bootstrap library, had a chat on their discord channel with maintainers and I realized that it was pretty obvious.
The library itself is not dependant on Bootstrap and doesn't actually use it, it gets loaded from cdn.
So, my only option was to build the Bootstrap by my own, which is not a great idea from maintainability perspective.
at that moment, I decided that using Bootstrap is an overhead for such a simple layout and I got rid of it.

- "?" in the middle of nowhere
- SVG icons
- colors contrast dilemma (pa11y)

## Timeline

- _8/7 (evening)_ - Initial setup: nvm, git, react, babel, webpack
- _8/8_ - Initial setup: typescript, favicon, tslint, prettier, husky, scss, stylelint, todos draft, jest
- _8/9_ - Crated mockup, first prototype; added bootstrap, dotenv, google maps, logo
- _8/10_ - Got rid of the bootstrap; UI design
- _8/11_ - Adaptive layout, cross-browser testing and fixes, npm update, improved accessibility
- _8/12 - 8/14_ - Created OAuth2 and API services, makeRequest function, marker clustering, SVG markers, user info component, MediaQueryListListener
- _8/15 - 8/17_ - Added eslint, tests, mocks; refactoring
- _8/18_ - Refactoring, optimization, minor fixes
- _8/19 - 8/21_ - Tests, refactoring, bug fixes and performance improvements
- _8/22_ - Bizarre iOS Safari layout bug fixes :)
- _8/23_ - Final testing and code review

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
- [x] User info component
  - [x] Basic markup
  - [x] Unit tests
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
      - [ ] (future) Add test for mediaQuery with mock
- [ ] Map component
  - [x] Basic markup
  - [x] Probably, DIY
  - [x] Maybe mark "Adresgegevens nog niet verwerkt" as greyed out
  - [x] Markers for retina
  - [x] Unit tests
  - [ ] (future) Add "locate me" button
  - [ ] (low priority) - partially solved by loading simultaneously. Maybe load map only after getting charging points to eliminate default map flash
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
