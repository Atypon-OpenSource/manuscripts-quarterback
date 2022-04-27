#####################
# The Node.js image #
#####################
# Not using builder image since it's quite tedious to copy / install everything all over
FROM node:16.10.0-alpine3.11

ENV NODE_ENV build
ENV INSTALL_PATH /usr/local/quarterback_api
ENV PNPM_PATH /home/node/.pnpm

WORKDIR ${INSTALL_PATH}

RUN npm install -g pnpm
RUN pnpm config set store-dir ${PNPM_PATH}

COPY package.json tsconfig.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY quarterback-packages/api ./quarterback-packages/api
COPY quarterback-packages/db ./quarterback-packages/db
COPY quarterback-packages/shared ./quarterback-packages/shared

RUN pnpm i --frozen-lockfile --filter @manuscripts/quarterback-api \
  --filter @manuscripts/quarterback-db \
  --filter @manuscripts/quarterback-shared
RUN pnpm run generate --filter @manuscripts/quarterback-db
RUN pnpm run build --filter @manuscripts/quarterback-shared

# RUN pnpm run test --filter @manuscripts/quarterback-api

ENV CORS_SAME_ORIGIN true

RUN pnpm run build --filter @manuscripts/quarterback-api
# TEST PR
RUN pnpm prune
COPY ./quarterback-packages/db/prisma/schema.prisma ./node_modules/schema.prisma

EXPOSE ${PORT}

CMD ["node", "./quarterback-packages/api/dist/index.js"]