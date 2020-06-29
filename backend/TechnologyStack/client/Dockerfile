FROM node:10.16-alpine as build

WORKDIR /node
COPY package.json package-lock.json ./

# install dependencies
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent


# Copy app source code
WORKDIR /node/app
COPY . .
RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build /node/app/build /usr/share/nginx/html
# new
COPY --from=build /node/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]