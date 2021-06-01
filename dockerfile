FROM public.ecr.aws/bitnami/node:latest
#FROM node:12.18.1
WORKDIR /app

COPY package.json ./
RUN npm_config_user=root npm i

COPY . .

RUN yarn build
EXPOSE 8080
CMD [ "node", "server.js" ]