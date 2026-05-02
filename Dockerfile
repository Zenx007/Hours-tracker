FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./

FROM base AS build
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/dist ./dist

EXPOSE 10000
CMD ["node", "dist/src/main.js"]
