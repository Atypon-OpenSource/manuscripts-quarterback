# [manuscripts-quarterback](https://github.com/Atypon-OpenSource/manuscripts-quarterback)

Quarterback is a service to manage tracking of changes and their related metadata for Manuscripts app. It also includes a prototype implementation for collaboration using Yjs.

## How to run locally

You need Docker & Docker Compose.

1. `docker-compose up -d api postgres`

## How to install for local development

First you should check you have Node.js v16 installed: `node -v`. If not, I recommend using [nvm](https://github.com/nvm-sh/nvm) to install 16 version. This is needed for the ES modules and other new features.

This project uses Docker and Docker Compose. You should have at least version 17 / 1.13 installed: `docker -v`. Then if you are using macOS (probably in Windows too, not Ubuntu though) you should ensure you have added this repository to the shared folders in your Docker settings eg `Preferences > Resources > File sharing` in macOS Docker Desktop.

Also this project imports https://gitlab.com/mpapp-public/manuscripts-manuscript-editor and https://gitlab.com/mpapp-public/manuscripts-style-guide as git submodules which you should checkout with: `git submodule update --init --recursive`

NOTE: it is a good idea to run `git submodule update --remote` once in a while incase the `quarterback-integration` branches in the git submodules have been updated. Incase a submodule was deleted it does not seem to update itself automatically and a manual removal is needed. Should not happen in general but be aware.

Finally, you should install `pnpm` globally if haven't already: `npm i -g pnpm`.

### Examples packages

`examples-packages` contain a prototype setup with Manuscript editor that closely follows the track changes implementation in `@manuscripts/manuscript-frontend`. It also includes an example Yjs server that uses Redis persistence.

1. Install all dependencies: `pnpm i`
2. Start the databases: `docker-compose up -d postgres redis`
3. Initialize example database: `./scripts.sh db:init-ex`
4. Copy the environment variables: `cp ./examples-packages/api/.example-env ./examples-packages/api/.env && cp ./examples-packages/collab/.example-env ./examples-packages/collab/.env && cp ./examples-packages/db/.example-env ./examples-packages/db/.env && cp ./examples-packages/client/.example-env ./examples-packages/client/.env`
5. Migrate the database: `pnpm --filter @manuscripts/examples-track-db migrate`
6. And seed it with test data: `pnpm --filter @manuscripts/examples-track-db seed`
7. Build the external manuscripts packages: `pnpm build:mod` NOTE: it seems building them has broke, you probably have to run them by their `build:cjs` `build:es` scripts separately.
8. Start the example app in http://localhost:4600: `pnpm ex:start`. However since the packages are created out of order, you may have to rerun the command multiple times. Other option is first run `pnpm ex:utils` a few times until the errors are gone. Then in another terminals `pnpm ex:api` `pnpm ex:collab` `pnpm ex:editor` and `pnpm ex:client`. Use `quarterback+ADMIN@atypon.com` and `asdfasdf` to login as admin. `quarterback+USER@atypon.com` `asdfasdf` is the other user.

Also, if you were to remove a package inside `packages` the node_modules in the other packages that import it must be deleted (even after you do `pnpm i`). The symlinks are not always removed properly it seems.

### Quarterback packages

`quarterback-packages` includes the deployed packages that are used in Manuscripts app.

1. Copy the environment variables: `cp ./quarterback-packages/api/.example-env ./quarterback-packages/api/.env && cp ./quarterback-packages/db/.example-env ./quarterback-packages/db/.env`
2. Migrate the database: `pnpm --filter @manuscripts/quarterback-db migrate`
3. Bundle the libraries and start the Quarterback API at http://localhost:5500 with: `pnpm start`

## Commands

You should run commands to individual packages with eg: `pnpm --filter @manuscripts/examples-track-api watch`. To run them recursively for every package you can use `-r` eg: `pnpm -r format`.

## Test users

```
admin
email: quarterback+ADMIN@atypon.com
pass: asdfasdf

user
email: quarterback+USER@atypon.com
pass: asdfasdf
```

## Tests

There are some example Cypress tests in `e2e` package. If you have the client running, you can execute them with `pnpm ex:e2e`. Or open the Cypress GUI with `pnpm ex:e2e:open`.

## Working with Git submodules

You can add a submodule with eg: `git submodule add -b quarterback-integration git@gitlab.com:mpapp-public/manuscripts-library.git examples-packages/library`

After which you should also add the package to the source control: `git add examples-packages/library`

Any time you update a submodule and push to its `quarterback-integration` branch, you must then also execute `git add examples-packages/<module>` here to update the tracked commit.

## Publishing new versions

Use this [guide](.changeset/README.md) to publish new versions using Changesets and Github Actions
