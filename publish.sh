#!/usr/bin/env bash
set -e;

if [[ -z "${NPM_TOKEN2}" ]]; then
  echo 'No NPM_TOKEN set!'
  exit 1
fi

pnpm --filter "./quarterback-packages/**" --no-git-checks publish
