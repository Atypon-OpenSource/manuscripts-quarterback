#!/bin/sh

pnpm run prod:migrate --filter @manuscripts/quarterback-db && \
node ./quarterback-packages/api/dist/index.js