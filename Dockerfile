FROM node:12.16.3-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --production

EXPOSE 4500

CMD [ "npm", "start" ]