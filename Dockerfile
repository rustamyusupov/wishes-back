FROM node:21-alpine

WORKDIR /app

COPY src ./src
COPY vite.config.ts ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/app.js" ]
