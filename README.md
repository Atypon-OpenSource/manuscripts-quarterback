# [manuscripts-quarterback](https://github.com/Atypon-OpenSource/manuscripts-quarterback)

Quarterback is a service to manage tracking of changes and their related metadata for Manuscripts app. It also includes a prototype implementation for collaboration using Yjs.

## How to run Quarterback locally

You need Docker & Docker Compose.

1. `docker-compose up -d api postgres`

## How to install for local development

First you should check you have Node.js >=16 installed: `node -v`. If not, I recommend using [nvm](https://github.com/nvm-sh/nvm). This is needed for the ES modules and other new features.

This project uses Docker and Docker Compose. You should have at least version 17 / 1.13 installed: `docker -v`. Then you might have to add this repository to the shared folders in your Docker settings (macOS or Windows - not Ubuntu though) eg `Preferences > Resources > File sharing` in macOS Docker Desktop.

Also this project imports https://gitlab.com/mpapp-public/manuscrsdsdipts-manuscript-editor https://gitlab.com/mpapp-public/manuscripts-manuscript-transform (now https://github.com/Atypon-OpenSource/manuscripts-schema havent migrated / removed since still works & not urgent) and https://github.com/Atypon-OpenSource/manuscripts-style-guide as git submodules which you should checkout with: `git submodule update --init --recursive`

NOTE: it is a good idea to run `git submodule update --remote` once in a while incase the `quarterback-integration` branches in the git submodules have been updated. Incase a submodule was deleted it does not seem to update itself automatically and a manual removal is needed. Should not happen in general but be aware.

For running the Postgres scrips you need to install `psql` eg: `install postgresql-client-common postgresql-client`

### Examples packages

`examples-packages` contain a prototype setup with Manuscript editor that closely follows the track changes implementation in LeanWorkflow. It also includes an example Yjs server that uses Redis persistence.

1. Checkout Git submodules if you haven't already: `git submodule update --init --recursive`
2. Install all dependencies: `pnpm i`
3. Start the databases: `docker-compose up -d postgres redis`
4. Initialize example database: `./scripts.sh db:init-ex`
5. Copy the environment variables: `cp ./examples-packages/api/.example-env ./examples-packages/api/.env && cp ./examples-packages/collab/.example-env ./examples-packages/collab/.env && cp ./examples-packages/db/.example-env ./examples-packages/db/.env && cp ./examples-packages/client/.example-env ./examples-packages/client/.env`
6. Migrate the database: `pnpm --filter @manuscripts/examples-track-db migrate`
7. And seed it with test data: `pnpm --filter @manuscripts/examples-track-db seed`
8. Build the external manuscripts packages: `pnpm ex:man` NOTE: their build throws compilation errors but they should compile nonetheless, incase something goes missing from the bundles you might have to run the builds separately eg `pnpm --filter @manuscripts/manuscript-transform build:cjs`
9. Start API in a terminal session: `pnpm ex:api`
10. Start Yjs server in a terminal session: `pnpm ex:collab`
11. Build / watch DB types & track-changes-plugin: `pnpm ex:utils`
12. Build / watch editor and its extensions: `pnpm ex:editor`
13. Start the client http://localhost:4600: `pnpm ex:client` Use `quarterback+ADMIN@atypon.com` and `asdfasdf` to login as admin. `quarterback+USER@atypon.com` `asdfasdf` is the other user.

Also, if you were to remove a package inside `packages` the node_modules in the other packages that import it must be deleted (even after you do `pnpm i`). The symlinks are not always removed properly it seems. `rm -rf node_modules` sometimes help to other problems as well..

### Quarterback packages

`quarterback-packages` includes the deployed packages that are used in Manuscripts app.

1. If you didn't clone the submodules, install with `pnpm --filter \"./quarterback-packages/**\" i` otherwise just use `pnpm i`
2. Copy the environment variables: `cp ./quarterback-packages/api/.example-env ./quarterback-packages/api/.env && cp ./quarterback-packages/db/.example-env ./quarterback-packages/db/.env`
3. Migrate the database: `pnpm --filter @manuscripts/quarterback-db migrate`
4. Bundle the libraries and start the Quarterback API at http://localhost:5500 with: `pnpm start`

## Commands

You should run commands to individual packages with eg: `pnpm --filter @manuscripts/examples-track-api watch`. To run them recursively for every package you can use `-r` eg: `pnpm -r build`.

## Test users

```
admin
email: quarterback+ADMIN@atypon.com
pass: asdfasdf

user
email: quarterback+USER@atypon.com
pass: asdfasdf
```

## Working with Git submodules

You can add a submodule with eg: `git submodule add -b quarterback-integration git@gitlab.com:mpapp-public/manuscripts-library.git examples-packages/library`

After which you should also add the package to the source control: `git add examples-packages/library`

Any time you update a submodule and push to its `quarterback-integration` branch, you must then also execute `git add examples-packages/<module>` here to update the tracked commit.

## Publishing new versions

Use this [guide](.changeset/README.md) to publish new versions using Changesets and Github Actions
