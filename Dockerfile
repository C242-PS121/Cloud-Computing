FROM oven/bun:alpine

WORKDIR /usr/src/app
COPY . .
RUN bun install --production

ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

CMD [ "bun", "run", "." ]