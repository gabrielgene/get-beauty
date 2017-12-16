FROM node:8.6.0

RUN mkdir -p /src/app

WORKDIR /src/app

COPY ./server /src/app/server

ADD package.json /src/app/package.json
ADD package-lock.json /src/app/package-lock.json

RUN npm install

EXPOSE 8000

CMD npm start
