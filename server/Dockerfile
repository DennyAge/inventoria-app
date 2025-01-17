ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]