#!/usr/bin/env bash
set -e;
set -x;
echo "Creating .npmrc"
cat << EOF >.npmrc
registry=https://registry.npmjs.org/
@manuscripts:registry=https://us-central1-npm.pkg.dev/atypon-artifact/npm-repo/
//us-central1-npm.pkg.dev/atypon-artifact/npm-repo/:always-auth=true
EOF
npx google-artifactregistry-auth
export NPM_TOKEN=`grep -E '//us-central1-npm.pkg.dev/atypon-artifact.*authToken=' ~/.npmrc | tail -1 | cut -f2 -d=`
pnpm --filter \"./quarterback-packages/**\" --no-git-checks publish
