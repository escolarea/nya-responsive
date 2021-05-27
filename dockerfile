FROM public.ecr.aws/bitnami/node:12-prod
#FROM node:12.18.1
WORKDIR /app

COPY package.json yarn.lock ./
RUN npm i

COPY . .

RUN yarn build
EXPOSE 8080
CMD [ "node", "server.js" ]