#!/usr/bin/env bash
set -e;

# Remove any dangling npmrcs with perhaps incorrect registries / tokens
if test -f ".npmrc"; then
  rm .npmrc
fi

if test -f "~/.npmrc"; then
  rm ~/.npmrc
fi

if [[ -z "${NPM_TOKEN}" ]]; then
  echo 'No NPM_TOKEN set!'
  exit 1
fi

pnpm ci:publish
