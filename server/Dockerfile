FROM node

WORKDIR /code

COPY package.json ./

COPY package-lock.json ./

RUN npm install

RUN npm run build

COPY  . .

CMD [ "node" "dist/index.js" ]

USER node
