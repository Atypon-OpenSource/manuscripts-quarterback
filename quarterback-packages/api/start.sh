#!/bin/sh

pnpm --filter @manuscripts/quarterback-db prod:migrate && \
node ./quarterback-packages/api/dist/index.js