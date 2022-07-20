FROM node:lts-alpine AS deps
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk update --no-cache \
    && apk upgrade --no-cache \
    && apk add --no-cache libc6-compat \
    && yarn config set registry https://registry.npmmirror.com 
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk update --no-cache \
    && apk upgrade --no-cache \
    && yarn config set registry https://registry.npmmirror.com \
    # && yarn build && yarn install --production --ignore-scripts --prefer-offline
    && yarn build


FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000
ENV PORT 3000

CMD ["node", "build/main.js"]