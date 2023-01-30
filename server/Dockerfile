FROM node:14

WORKDIR /code

COPY package.json ./

COPY package-lock.json ./

RUN npm install

RUN npm run build

COPY  . .

EXPOSE 8080

CMD [ "node" "dist/index.js" ]

USER node
