FROM node:alpine
WORKDIR /app
COPY . .
EXPOSE 4542
RUN chmod +x ./*.sh
CMD ./serve.sh
