# Story

**DISCLAIMER**: For the past few weeks I've been working on this assignment pretty much full-time.
My goal was to make it as much production-ready as possible while showcasing my skills by not overusing NPM packages.

## Why it's a single page, and not separate login and map pages?

I used [my.newmotion.com](https://my.newmotion.com/) as a reference because it looks pretty similar to the assignment requirements.
But in the assignment, there was a request for separate pages for login and map.
Because I was aiming to create a real-life website, I put a lot of thought into it.
I thought that it would be much better UX to show the map without requiring to login first, and this approach is also used on myNewMotion.
So, I decided to go with the same approach.
Using a separate login page would make sense in case if our priority was to get new customer sign-ups,
because in this scenario if a user wants to see the map - one has to sign up first.
I made an assumption that priority is to provide the best UX to both new and returning customers, so a single page made more sense to me.
After deciding on the page layout, I created a simple [layout mockup](./design/mockup.png).

## Wait, I thought you were going to use Bootstrap?...

I researched which technologies are used on myNewMotion, because it's very likely that I'll be dealing with them on the job and I wanted to showcase my skills.
I found out that it uses Bootstrap and I felt pretty comfortable using it, so I decided to go with it.
I've used [React Bootstrap](https://react-bootstrap.github.io/) package to streamline work on my prototype.
Down the road, I found out that my IDE doesn't understand React-Bootstrap types correctly and gave me the warning for almost every component.
I've opened [PR](https://github.com/react-bootstrap/react-bootstrap/pull/4221) to the library but it was quite a dirty solution and not libraries fault in the first place.
Later, I tried to make it better, found another bug, but it seems like there's a bug in React typings that prevents me from implementing this fix.
Anyway, I also reported the [issue](https://youtrack.jetbrains.com/issue/WEB-40641?p=IDEA-220380) to the IDE bug tracker.

Because I was using myNewMotion as a reference, I needed to get rid of the rounded corners for inputs that bootstrap uses by default.
There are a ton of ways to do this, but I thought that the best way is to set `$enable-rounded` variable in the SCSS version of Bootstrap to `false`.
I didn't find any way to do this from React-Bootstrap library, had a chat on their discord channel with maintainers and I realized that it was pretty obvious.
The library itself is not dependant on Bootstrap and doesn't actually use it, it gets loaded from CDN.
So, my only option was to build the Bootstrap on my own, which is not a great idea from a maintainability perspective.
at that moment, I decided that using Bootstrap is an overhead for such a simple layout and I got rid of it.

## What's that (?) marker all about?

Once the map was working, I added `fitBounds` function to automatically fit all markers on the map.
That's when I first noticed the marker in the middle of nowhere at Severny Island in Russia.
I thought that it's quite strange because there's a lot of snow there, no city and it just didn't seem like a place where the charger might be.
I've checked the real map and it wasn't there. I looked at the sample JSON from the assignment and found that for this charger, the `city` was `Adresgegevens nog niet verwerkt`,
which google translates as "Address details not processed yet". I found that there is a "?" type of marker on the myNewMotion and I felt that it seems like a good fit for this kind of situation.
So, I created a rule for this edge-case.

## Wow, such sharp markers! Where did you get them from?

Continuing with markers, when I was testing my assignment on mobile devices, markers that I downloaded from the myNewMotion didn't look sharp.
It was because my mobile devices have DPI higher than desktop (i.e., retina), so I had to find a way to make them look sharp.
First, I discovered a way to use responsive images for google maps markers. But then, I quickly realized that I will have to create SVG versions to export @2x and @3x .png`s later.
And since creating SVGs was inevitable, I found out that I also can use SVGs for markers, which is a pretty awesome and simpler solution than my original one.
Creating basic "Ɛ>" marker was quite easy because I used the SVG logo of NewMotion to extract the heart and by using bitmap overlay, recreated it to be pretty close to the original marker.
I had issues with the "?" marker though. I couldn't guess the font of the "?" sign. and there were not enough characters to use font-detectors. So, I made a wild guess, tried Helvetica and it matched :)
It was pretty obvious, because most of the designers that I know, use Helvetica almost everywhere :) I only had to change the "." because in Helvetica it was too rectangular.

## Did you forget about accessibility?

After my prototype was finished, I ran the accessibility tests using [pa11y](https://pa11y.org/).
That's when I found myself in big trouble. I used the blue-ish brand color of NewMotion in the header and put white labels on it.
Turned out, there were not enough contract between that background and white input labels. It was a real bummer.
I was trying to find a better way to display my labels by adding a background, changing the header background, but I didn't like any of the results.
So, I have to confess that there's an issue with contrast and solving it probably will require changing layout pretty dramatically.
A simple fix would be to use black logo and labels on white background, but I really liked this blue-ish background.
Also, in the NewMotion mobile app, the same combination of colors is used, so I thought that it should be fine for now, and we can figure something out with the designer later.

## Why do I need to run the server?

Well, the assignment asked to use sample JSON with charge points as a database, so I thought that rather than requesting this file directly,
it's better to create a fake server that will serve this file, faking the database. It's really simple, but still, shows that I can write a server :)

## Why not using fancy `fetch()`?

That's quite an interesting question. `api.test.thenewmotion.com` don't have CORS enabled, and `fetch()` [appears](https://stackoverflow.com/questions/37668282/unable-to-fetch-post-without-no-cors-in-header)
to enforce CORS when using headers other than `Content-Type`.
So, because I have to use the `Authorization` header to perform HTTP auth, `fetch()` didn't work for me. Also, I'm not able to change server configuration, because I don't have access to it and I didn't want to bother you with that.
That's why I decided to try `XMLHttpRequest` and it worked like a charm, ignoring those CORS :)
For my fake server, I had to enable CORS though. Not in the most elegant way, it allows any requests to go through.
I could limit it to the specific request types, or origins, but I decided not to, because it's just a fake server, after all :)

## What about tests?

Yep, I have them. Honestly, I don't have a lot of experience writing tests. On projects where I worked before, they were are usually undervalued or ignored completely.
Especially in my home-brew projects, implementing features is more valuable than writing tests.
But I always knew that writing tests is good, and might be very helpful, so I decided to give it a try.
I picked `react-testing-library` and not `Enzyme` because it encourages developers to write more reliable integration tests, while `Enzyme` mostly tests implementation.
Despite that, I created not only integration tests but also unit tests using the same library. Not sure if that was the right thing to do, I just felt that there's not enough testing after I wrote integration tests :)
There's also different configs for running them, so unit tests can be ignored.

## We're not interested in clustering, why you did it?

Well, it came to me naturally :)
When I used `fitBounds()`, it made a lot of markers in the Netherlands to be displayed very tight and on top of each other.
And previously, when I was doing a research project for taxi rides, I wanted to visualize points of pickups and used markers clustering. For my case, it wasn't a good solution, so I switched to heat-maps.
But for this assignment, I thought that it would be a nice touch. I even added the same CSS animation for clusters as you use at myNewMotion :)
I figured out later, that you use clustering on the server, which is quite cool.
But I used clustering on the front-end and later when testing on iPhone in the landscape mode, I found a bug in clusterer that prevent me from zooming by clicking cluster in specific cases.
That's why I modified the default behavior to zoom only one level instead of trying to fit as many points of the cluster as possible.
It's not as good as original, but I didn't want to dive even deeper into the plugin to fix their bug.

## Why your [ToDo](#ToDo:) list have unfinished tasks? Isn't it perfect?

I'm glad you asked :)
While I was trying to do as much as I can, there's still a room for improvement. I'm aware of it and not trying to hide it.
Most tasks are marked as `(future)`, meaning that they were outside of the current scope, but I plan to do them later.

I like the design and how it adapts to different resolutions very much. I put a lot of thought to it.
Especially, error messages were kind of a pain to design, because if I would append them to the standard page flow, they would take too much space.
And I struggled to find a place for them for quite a bit. There was just not enough space to fit them without breaking the page layout, or making header even taller, which wasn't a good idea for mobile devices.
So, I decided to go with "floating" error messages and it seems like a nice solution, but it could be better.
Also, a lot of effort went to make the page full-height without scrolling on iOS.
The worst scenario is to load the page while in the vertical orientation, then flip the phone to horizontal, so that Safari shows full-screen view, without an address bar. And then, tap the top of the screen to make Safari show address bar.
At this point, they are adding 50px margin at the bottom of the page that I was unable to get rid of no matter what selector I tried: `body`, `html`, even `:root`. Nothing works.
I tried this on the blank page with no content and it still was adding that needless margin, making scrolling possible again.
That's why I added iOS hacks that disable scroll completely, forces it to stay at the top and uses JS to resize the map because CSS just wasn't working correctly when iOS resizes the viewport.
I don't think it's even near an elegant solution, so I probably wouldn't go with the full-viewport-height design next time. I knew that it's usually hard but never tried to use it on iOS.

Probably, having separate components for Mobile and Desktop Login form is also not a good solution. The alternative was to conditionally render a single component.
But both solutions introduce additional complexity: either having two simple components to test and maintain or having a single complex component.
I decided that it should be better to maintain two simple components than one complex.

Also, I wanted to use `react-media` npm package to make this component responsive, but I decided to learn how the package was built to recreate it by myself.
It resulted in a couple of contributions and discoveries:

- [ReactTraining/react-media/pull/135](https://github.com/ReactTraining/react-media/pull/135) - deprecated addListener and removeListener update
- [facebook/jest/pull/8835](https://github.com/facebook/jest/pull/8835) - Updated matchMedia methods
- [Fyrd/caniuse/pull/5048](https://github.com/Fyrd/caniuse/pull/5048) and [Fyrd/caniuse/pull/5055](https://github.com/Fyrd/caniuse/pull/5055) - MediaQueryList.addEventListener Safari and IE bug
- [TypeScript/issues/32210#issuecomment-523621957](https://github.com/microsoft/TypeScript/issues/32210#issuecomment-523621957) - MediaQueryList.prototype.addListener & removeListener are marked as deprecated

During that time, I was also building my app for personal accounting, had issues with Google Sheets API typings, learned about [Google API Discovery Service](https://developers.google.com/discovery/)
and did two more contributions:

- [Bolisov/google-api-typings-generator/pull/8](https://github.com/Bolisov/google-api-typings-generator/pull/8) - Take into account `repeated` flag for types
- [DefinitelyTyped/DefinitelyTyped/pull/37847](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/37847) - [gapi.client.sheets] Update Google Sheets API with fixes

## Timeline

- _8/7 (evening)_ - Initial setup: nvm, git, react, babel, webpack
- _8/8_ - Initial setup: typescript, favicon, tslint, prettier, husky, scss, stylelint, todos draft, jest
- _8/9_ - Crated mockup, prototype; added bootstrap, dotenv, google maps, logo
- _8/10_ - Got rid of the bootstrap; UI design
- _8/11_ - Adaptive layout, cross-browser testing and fixes, npm update, improved accessibility
- _8/12 - 8/14_ - Created OAuth2 and API services, makeRequest function, marker clustering, SVG markers, user info component, MediaQueryListListener
- _8/15 - 8/17_ - Added eslint, tests, mocks; refactoring
- _8/18_ - Refactoring, optimization, minor fixes
- _8/19 - 8/21_ - Tests, refactoring, bug fixes, and performance improvements
- _8/22_ - Bizarre iOS Safari layout bug fixes :)
- _8/23_ - Final testing and code review

# Getting Started

## Setup Environment

### Install specific node and npm versions (recommended, but optional step)

1. Install [nvm](https://github.com/nvm-sh/nvm#install--update-script) or [nvm-windows](https://github.com/coreybutler/nvm-windows) depending on your OS.
   ```shell script
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
   ```
2. Install node version from `.nvmrc` file (recommended optional step):
   ```shell script
   nvm install
   ```
3. Install npm version from `package.json` -> `engines.npm`:

   ```shell script
   npm i -g npm@$(grep '"npm"' package.json | cut -d '"' -f 4)
   ```

## Configuration

You can configure the app using [.env](./.env) file.
Most of the variables are there because of the security reasons (makes no difference for the assignment, but still, I wanted to show that I don't include such info in the public git repos)

- **CHARGING_POINTS_API_ENDPOINT** - fake server URL. If you want to test it on your local network (on mobile devices, for example), change it to something like `http://192.168.0.104` _don't include port, it gets included automatically_
- **CHARGING_POINTS_API_ENDPOINT_PORT** - fake server PORT. If your `8081` port is busy running another server, change this. Don't forget to add a rule to your firewall if you want to test in your local network.
- GOOGLE_MAPS_JS_API_KEY - you can use your API_KEY, or use mine, it should work
- OAUTH2_ENDPOINT - endpoint used for authentication, you don't have to change it
- OAUTH2_HTTP_ID - login for HTTP auth, no need to change it
- OAUTH2_HTTP_SECRET - password for HTTP auth, no need to change it
- USER_API_ENDPOINT - endpoint to get user information

_Note:_ environment variables are only used during the build phase, so after updating them, you have to rebuild the app. Fake-server will pick the environment variables without a rebuild but requires a restart.
Webpack clears dist folder before every build, so you have to rebuild server after rebuilding the app. (Probably I should've created the separate `dist-server` folder).

## Build and Run

1. Install dependencies (both prod and dev are required for the build, overwrite NODE_ENV from env variables if it's `production`):
   ```shell script
   NODE_ENV=development npm install
   ```
2. Build (for production):

   ```shell script
   npm run build
   ```

   or Run development server with live-reload:

   ```shell script
   npm start
   ```

## Serving from [`dist`](./dist)

1. Open project in terminal
2. Install `serve` globally:
   ```shell script
   npm install -g serve
   ```
3. Start the server:
   ```shell script
   node dist/fake-server.js
   ```
4. Serve the app:
   ```shell script
   serve dist
   ```
5. Open URL provided by `serve`. It should look like this for local viewing: `http://localhost:5000`
6. If you'd like to test it on your mobile device:
   - Make sure that it's in the same local network
   - Your `5000` and `8081` (default) ports are open in the firewall
   - Update `CHARGING_POINTS_API_ENDPOINT` in `.env` with your local IP (i.e., `http://192.168.0.104`, include `http://` scheme part). Otherwise, you'll get "Failed to get charging points" error and map will not load
   - Rebuild the app (`npm run build`)
   - Serve it again and it should work

## Testing

- To run all tests (both unit and integration): `npm run test`
- To run all checks (types check by `tsc`, tslint, prettier, stylelint and eslint): `npm run all-checks`

# Logic

## Logging in

- When you hit "Sign in" button, the browser will check login form for validity and if it's valid - login request will begin
- While logging in, input fields and "Sign in" button are disabled to prevent race conditions and to indicate loading process
- If there were an error - we'll try to display the beautified error message from server at the right top of the screen
- Otherwise, the login form will be replaced with welcome text, mentioning the user's first and last name
- Currently, the auth token is not stored locally, so to sign out, simply reload the page

## Map

- Map component appends `<script>` tag to load google maps api, and at the same time, send the request to get charging points from the fake-server
- Once both google maps api and charging points data are ready, it will render the map component and add markers
- If charging points request failed - an error message will appear at the left bottom of the screen

# Project Structure

- `.editorconfig` - basic formatting rules config
- `.env` - environment variables used to configure the app
- `.eslintrc.js` - eslint rules
- `.gitignore` - contains the list of files ignored by git
- `.nvmrc` - contains node version, used by nvm
- `.prettierignore` - used to ignore JS compiled from TS
- `assignment.md` - original assignment text
- `babel.config.js` - used by Babel
- `jest.config.integration.js` - jest config for running only integration tests
- `jest.config.js` - jest config for running both integration and unit tests
- `jest.config.unit.js` - jest config for running unit tests
- `package.json` - node config file
- `package-lock.json` - another node config file with precise package versions
- `prettier.config.js` - used to format the code
- `README.md` - the file that you're reading ;)
- `sample-json-charge-points.json` - JSON from the assignment with charge points, used by fake-server
- `stylelint.config.js` - used for linting .scss files
- `tsconfig.json` - used for compiling TypeScript
- `tslint.json` - used for linting TypeScript
- `webpack.config.js` - used for building the app
- `design` - contains mockup
- `src/`
  - `__mocks__/` - mocks for tests
  - `__tests__/`
    - `helpers/` - used for abstraction in tests (not a good thing for tests, apparently)
    - `integration/` - integration tests
    - `unit/` - unit tests, same structure as `../components/`
    - `components/`
      - `presentational/` - presentational components (don't use state)
      - `SomeComponent.tsx` - component code
      - `SomeComponent.scss` - component styles
    - `helpers/` - services like API, OAuth2, other utilities and constants
    - `static/` - static image resources
    - `types/` - global typings, mostly to make TypeScript happy :)
  - `fake-server.ts` - emulates real API endpoint, used to get charging points
  - `favicon.ico` - website icon
  - `index.html` - single app page
  - `index.tsx` - entry point
  - `variables.scss` - SCSS variables

# ToDo:

- [x] Configure webpack with babel and plugins
- [x] Add and configure TypeScript, SCSS
- [x] Add linting and code style solutions, such as eslint/gts
- [x] Set up Jest and react-testing-library for running tests
- [x] Probably, use Bootstrap CSS framework (as on the myNewMotion)
- [x] Get rid of the Bootstrap because it's an overhead for such a simple layout, but leave it as a branch for historical purpose
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
  - [x] Disable fields while loading
  - [x] Replace react-media with MediaQueryListListener
  - [ ] (future) Add loading indicator
  - [ ] (future) Email/password validation/errors
  - [ ] (future) Maybe save the token to some kind of local storage
  - [ ] (future) Hide form on mobile with tiny VH under the hamburger menu, etc.
  - [ ] (future) Debounce form loading indicator
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
  - [ ] (low priority) Maybe load map only after getting charging points to eliminate default map flash - partially solved by loading simultaneously
  - [ ] (future) Add the "locate me" button
- [ ] Oauth2 service
  - [x] Basic implementation
  - [ ] (future) Maybe create unit tests
- [ ] HTTP API service
  - [x] Basic implementation
  - [ ] (future) Maybe create unit tests
- [ ] Cross-browser testing
  - [x] Basic testing
  - [ ] (future) Determine which polyfills are required (reduce bundle size)
- [ ] Accessibility testing
  - [x] Basic testing (pa11y)
  - [ ] (future) Think about the contrast between labels and button...
- [x] Add Readme with instructions

# P.S.

I've learned a lot from this assignment and enjoyed doing it very much, thank you! :)

I hope that in the future, I'll be able to use the results of this assignment and my findings to make myNewMotion and other NewMotion services better!
