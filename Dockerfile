FROM node:21-alpine

WORKDIR /app

COPY src ./src
COPY vite.config.ts ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm run build

EXPOSE 9000

CMD [ "node", "./dist/index.js" ]
