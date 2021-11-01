# [manuscripts-quarterback](https://gitlab.com/mpapp-public/manuscripts-quarterback)

## How to install

First you should check you have Node.js v16 installed: `node -v`. If not, I recommend using [nvm](https://github.com/nvm-sh/nvm) to install 16 version. This is needed for the ES modules and other new features.

Install `pnpm` globally if haven't already: `npm i -g pnpm`. Also you need Docker.

1. Install all dependencies: `pnpm i -r`
3. Start the database: `docker-compose up -d postgres`
4. Copy the environment variables: `cp ./packages/api/.example-env ./packages/api/.env && cp ./packages/collab/.example-env ./packages/collab/.env && cp ./packages/db/.example-env ./packages/db/.env && cp ./packages/example-app/.example-env ./packages/example-app/.env`
5. Migrate the database: `pnpm run migrate --filter @manuscripts/quarterback-db`
6. And seed it with test data: `pnpm run seed --filter @manuscripts/quarterback-db`
7. Start the app in http://localhost:4600: `pnpm start`

## Commands

You should run commands to individual packages with eg: `pnpm run watch --filter @manuscripts/quarterback-api`. To run them recursively for every package you can use `-r` eg: `pnpm run format -r`.
