FROM node:alpine
WORKDIR /app
COPY . .
RUN yarn install --ignore-optional --ignore-scripts --no-progress --production
EXPOSE 4542
RUN chmod +x ./*.sh
CMD ./serve.sh
