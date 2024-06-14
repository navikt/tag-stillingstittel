FROM chainguard/node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ./node_modules ./node_modules
COPY server.mjs /app

CMD [ "server.mjs" ]
