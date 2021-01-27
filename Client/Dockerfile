FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

run npm install

COPY . .

CMD ["npm", "start"]