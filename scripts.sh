#!/usr/bin/env bash

DB_HOST=localhost
DB_PORT=5402
DB_USER=pg-user
DB_PASSWORD=pg-password
DB_NAME=local_quarterback_db

# utils / api:watch / api:dev are used to run the scripts in Windows as concurrently fails in Git bash

case "$1" in
  connect)
    psql postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
    ;;
  db:connect)
    psql postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
    ;;
  db:init-ex)
    psql postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME} -v ON_ERROR_STOP=1 <<-EOSQL
      DROP DATABASE IF EXISTS local_example_db;
	    CREATE DATABASE local_example_db;
	    GRANT ALL PRIVILEGES ON DATABASE local_example_db TO "${DB_USER}";
EOSQL
  ;;
  utils)
    pnpm --parallel --filter @manuscripts/examples-track-types \
      --filter @manuscripts/examples-track-schema \
      --filter @manuscripts/examples-track-editor \
      --filter @manuscripts/track-changes-plugin \
      --filter @manuscripts/ext-yjs \
      --filter @manuscripts/ext-comments \
      watch
    ;;
  api:watch)
    pnpm --parallel --filter @manuscripts/examples-track-api \
      --filter @manuscripts/examples-track-collab \
      watch
    ;;
  api:dev)
    pnpm --filter @manuscripts/examples-track-api \
      --filter @manuscripts/examples-track-collab \
      dev
    ;;
  *)
    echo $"Usage: $0 db:connect|db:init-ex|utils|api:watch|api:dev"
    exit 1
esac