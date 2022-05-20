#!/usr/bin/env bash

gcloud artifacts print-settings npm \
  --project=atypon-artifact \
  --repository=npm-repo \
  --location=us-central1 \
  --scope=@manuscripts > .npmrc
npx google-artifactregistry-auth
export NPM_TOKEN=`grep -E '//us-central1-npm.pkg.dev/atypon-artifact.*authToken=' ~/.npmrc | tail -1 | cut -f2 -d=`
pnpm --filter \"./quarterback-packages/**\" --no-git-checks publish
