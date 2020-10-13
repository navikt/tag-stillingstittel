FROM node:alpine
WORKDIR /app
COPY . .
CMD [ "node", "serve.js" ]