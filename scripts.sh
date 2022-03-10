#!/usr/bin/env bash

DB_HOST=localhost
DB_PORT=5402
DB_USER=pg-user
DB_PASSWORD=pg-password
DB_NAME=local_quarterback_db

# utils / api:watch / api:dev are used to run the scripts in Windows as concurrently fails in Git bash

case "$1" in
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
    pnpm run watch --parallel --filter @manuscripts/examples-track-shared --filter @manuscripts/examples-track-schema --filter @manuscripts/examples-track-editor --filter @manuscripts/ext-track-changes --filter @manuscripts/ext-yjs
    ;;
  api:watch)
    pnpm run watch --parallel --filter @manuscripts/examples-track-api --filter @manuscripts/examples-track-collab
    ;;
  api:dev)
    pnpm run dev --filter @manuscripts/examples-track-api --filter @manuscripts/examples-track-collab
    ;;
  *)
    echo $"Usage: $0 db:connect|utils|api:watch|api:dev"
    exit 1
esac