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
    && yarn global add pkg \
    && yarn build \
    && yarn pkg

FROM alpine:latest AS runner
WORKDIR /app

ENV NODE_ENV production
COPY --from=builder /app/dist ./

EXPOSE 3000
ENV PORT 3000

CMD ["./dist/boring-avatars-services-linux"]