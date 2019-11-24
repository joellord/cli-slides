FROM node:10
COPY . /app
WORKDIR /app
CMD node . ./containers.json
