#!/bin/sh

pnpm --filter @manuscripts/quarterback-db prod:reset && \
node ./quarterback-packages/api/dist/index.js