#####################
# The Node.js image #
#####################
# Not using builder image since it's quite tedious to copy / install everything all over
FROM node:16.10.0-alpine3.11

ENV NODE_ENV build
ENV INSTALL_PATH /usr/local/quarterback_api
ENV PNPM_PATH /home/node/.pnpm

WORKDIR ${INSTALL_PATH}

RUN npm install -g pnpm@7
RUN pnpm config set store-dir ${PNPM_PATH}

COPY package.json tsconfig.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy package.jsons first to cache pnpm install to run only if they were changed, not on source file changes
COPY quarterback-packages/api/package.json ./quarterback-packages/api/package.json
COPY quarterback-packages/db/package.json ./quarterback-packages/db/package.json
COPY quarterback-packages/shared/package.json ./quarterback-packages/shared/package.json

RUN pnpm i --frozen-lockfile --filter @manuscripts/quarterback-api \
  --filter @manuscripts/quarterback-db \
  --filter @manuscripts/quarterback-shared

COPY quarterback-packages/db ./quarterback-packages/db
RUN pnpm --filter @manuscripts/quarterback-db generate
COPY quarterback-packages/db/prisma/schema.prisma ./node_modules/schema.prisma

COPY quarterback-packages/shared ./quarterback-packages/shared
RUN pnpm --filter @manuscripts/quarterback-shared build

COPY quarterback-packages/api ./quarterback-packages/api
# RUN pnpm test --filter @manuscripts/quarterback-api test
RUN pnpm --filter @manuscripts/quarterback-api build

# RUN pnpm prune

ENV CORS_SAME_ORIGIN true

EXPOSE ${PORT}

CMD ./quarterback-packages/api/start.sh