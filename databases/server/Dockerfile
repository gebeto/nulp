FROM node:10.15.1-alpine

MAINTAINER <slavik.nychkalo@gmail.com>

RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk update
RUN apk upgrade
RUN apk add --no-cache bash git openssh

RUN mkdir -p /server
WORKDIR /server

COPY . /server

RUN npm install

# EXPOSE 3000
CMD [ "yarn", "start" ]