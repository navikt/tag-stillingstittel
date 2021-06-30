FROM navikt/node-express:14-alpine

WORKDIR /app

COPY ./node_modules ./node_modules
COPY server.js server.js
COPY package.json package.json

ENV NODE_EXTRA_CA_CERTS /etc/ssl/ca-bundle.pem

EXPOSE 4000
