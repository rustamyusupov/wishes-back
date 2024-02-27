FROM node:21-alpine

WORKDIR /app

ARG WISHES_DB
ARG WISHES_SECRET
ENV WISHES_DB ${WISHES_DB}
ENV WISHES_SECRET ${WISHES_SECRET}

COPY src ./src
COPY vite.config.ts ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 9000

CMD [ "node", "./dist/index.js" ]
