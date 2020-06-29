FROM node:10.16-alpine
WORKDIR /node
COPY package.json package-lock.json ./

RUN npm install
WORKDIR /node/app
COPY . .

EXPOSE 7500
CMD ["npm", "start"]