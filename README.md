# [manuscripts-quarterback](https://gitlab.com/mpapp-public/manuscripts-quarterback)

## How to install

First you should check you have Node.js v16 installed: `node -v`. If not, I recommend using [nvm](https://github.com/nvm-sh/nvm) to install 16 version. This is needed for the ES modules and other new features.

This project uses Docker and Docker Compose. You should have at least version 17 / 1.13 installed: `docker -v`. Then you should ensure you have added this repository to the shared folders in your Docker settings eg `Preferences > Resources > File sharing` in macOS Docker Desktop.

Also this project imports https://gitlab.com/mpapp-public/manuscripts-manuscript-editor and https://gitlab.com/mpapp-public/manuscripts-style-guide as git submodules which you should checkout with: `git submodule update --init --recursive`

Finally, you should install `pnpm` globally if haven't already: `npm i -g pnpm`.

1. Install all dependencies: `pnpm i -r`
3. Start the database: `docker-compose up -d postgres`
4. Copy the environment variables: `cp ./packages/api/.example-env ./packages/api/.env && cp ./packages/collab/.example-env ./packages/collab/.env && cp ./packages/db/.example-env ./packages/db/.env && cp ./packages/example-app/.example-env ./packages/example-app/.env`
5. Migrate the database: `pnpm run migrate --filter @manuscripts/quarterback-db`
6. And seed it with test data: `pnpm run seed --filter @manuscripts/quarterback-db`
7. Start the app in http://localhost:4600: `pnpm start`

## Commands

You should run commands to individual packages with eg: `pnpm run watch --filter @manuscripts/quarterback-api`. To run them recursively for every package you can use `-r` eg: `pnpm run format -r`.

## Tests

There are some example Cypress tests in `e2e` package. If you have the example-app running, you can execute them with `pnpm e2e`. Or open the Cypress GUI with `pnpm e2e:open`. 

## Working with Git submodules

When I'm adding submodules, I first go to the packages `cd packages` and then add the module eg `git submodule add git@gitlab.com:mpapp-public/manuscripts-manuscript-transform.git manuscript-transform`.

Afterwards, I add the branch to the submodule in `.gitmodules`
```
	branch = quarterback-integration
```

And then pull the latest head of that branch: `git submodule update --init --recursive`

You might have to cd first into module and update its branch though: `cd packages/manuscript-transform && git pull && git checkout quarterback-integration`
