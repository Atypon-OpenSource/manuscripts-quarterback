# [manuscripts-quarterback](https://gitlab.com/mpapp-public/manuscripts-quarterback)

## How to install

First you should check you have Node.js v16 installed: `node -v`. If not, I recommend using [nvm](https://github.com/nvm-sh/nvm) to install 16 version. This is needed for the ES modules and other new features.

This project uses Docker and Docker Compose. You should have at least version 17 / 1.13 installed: `docker -v`. Then you should ensure you have added this repository to the shared folders in your Docker settings eg `Preferences > Resources > File sharing` in macOS Docker Desktop.

Also this project imports https://gitlab.com/mpapp-public/manuscripts-manuscript-editor and https://gitlab.com/mpapp-public/manuscripts-style-guide as git submodules which you should checkout with: `git submodule update --init --recursive`

NOTE: it is a good idea to run `git submodule update --remote` once in a while incase the `quarterback-integration` branches in the git submodules have been updated. Incase a submodule was deleted it does not seem to update itself automatically and a manual removal is needed. Should not happen in general but be aware.

Finally, you should install `pnpm` globally if haven't already: `npm i -g pnpm`.

1. Install all dependencies: `pnpm i -r`
3. Start the database: `docker-compose up -d postgres`
4. Copy the environment variables: `cp ./packages/api/.example-env ./packages/api/.env && cp ./packages/collab/.example-env ./packages/collab/.env && cp ./packages/db/.example-env ./packages/db/.env && cp ./packages/example-app/.example-env ./packages/example-app/.env`
5. Migrate the database: `pnpm run migrate --filter @manuscripts/quarterback-db`
6. And seed it with test data: `pnpm run seed --filter @manuscripts/quarterback-db`
7. Build the external manuscripts packages: `pnpm build`
8. Start the app in http://localhost:4600: `pnpm start`. Or you can also start them as groups: `pnpm utils` `pnpm api` `pnpm client`

NOTE: The `pnpm start` command will fail the first couple of times due to the fact the packages are not built in the correct order. Meaning some packages are missing when you execute `watch` in some other package eg `quarterback-editor`.

Also, if you were to remove a package inside `packages` the node_modules in the other packages that import it must be deleted (even after you do `pnpm i`). The symlinks are not always removed properly it seems.

## Commands

You should run commands to individual packages with eg: `pnpm run watch --filter @manuscripts/quarterback-api`. To run them recursively for every package you can use `-r` eg: `pnpm run format -r`.

## Tests

There are some example Cypress tests in `e2e` package. If you have the example-app running, you can execute them with `pnpm e2e`. Or open the Cypress GUI with `pnpm e2e:open`. 

## Working with Git submodules

You can add a submodule with eg: `git submodule add -b quarterback-integration git@gitlab.com:mpapp-public/manuscripts-library.git packages/library`

After which you should also add the package to the source control: `git add packages/library`

Any time you update a submodule and push to its `quarterback-integration` branch, you must then also execute `git add packages/<module>` here to update the tracked commit.

## Publishing new versions

Use this [guide](.changeset/README.md) to publish new versions using Changesets and Github Actions