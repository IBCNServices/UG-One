
FROM node:10.16-alpine
WORKDIR /node
COPY package.json package-lock.json ./

RUN npm install
WORKDIR /node/app
COPY . .

EXPOSE 5000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start
