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
