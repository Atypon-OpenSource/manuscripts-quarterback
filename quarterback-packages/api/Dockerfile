#####################
# The Node.js image #
#####################
# Not using builder image since it's quite tedious to copy / install everything all over
FROM node:16.10.0-alpine3.11

ENV NODE_ENV build
ENV INSTALL_PATH /usr/local/quarterback_api

WORKDIR ${INSTALL_PATH}

RUN npm install -g pnpm@7

COPY package.json tsconfig.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy package.jsons first to cache pnpm install to run only if they were changed, not on source file changes
COPY quarterback-packages/api/package.json ./quarterback-packages/api/package.json
COPY quarterback-packages/db/package.json ./quarterback-packages/db/package.json
COPY quarterback-packages/types/package.json ./quarterback-packages/types/package.json

RUN pnpm i --frozen-lockfile --filter @manuscripts/quarterback-api \
  --filter @manuscripts/quarterback-db \
  --filter @manuscripts/quarterback-types

COPY quarterback-packages/db ./quarterback-packages/db
RUN pnpm --filter @manuscripts/quarterback-db generate
COPY quarterback-packages/db/prisma/schema.prisma ./node_modules/schema.prisma
COPY quarterback-packages/db/generated/index.d.ts ./quarterback-packages/types/prisma/index.d.ts

COPY quarterback-packages/types ./quarterback-packages/types
RUN pnpm --filter @manuscripts/quarterback-types build

COPY quarterback-packages/api ./quarterback-packages/api
# RUN pnpm test --filter @manuscripts/quarterback-api test
RUN pnpm --filter @manuscripts/quarterback-api build

# RUN pnpm prune

ENV NODE_ENV production
# CORS is disabled by default since 1) it breaks 2) requests are blocked already outside deployed site
ENV CORS_ENABLED 0

EXPOSE ${PORT}

CMD ./quarterback-packages/api/start.sh