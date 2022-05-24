#!/usr/bin/env bash
set -e;

if [[ -z "${NPM_TOKEN}" ]]; then
  echo 'No NPM_TOKEN set!'
  exit 1
fi

clean_npmrcs() {
  if test -f ".npmrc"; then
    rm .npmrc
  fi
  if test -f "~/.npmrc"; then
    rm ~/.npmrc
  fi
}

trap clean_npmrcs EXIT

cat << EOF >.npmrc
//registry.npmjs.org/:_authToken=$NPM_TOKEN
EOF

pnpm ci:publish
