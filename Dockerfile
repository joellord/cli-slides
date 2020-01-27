FROM node:10
COPY . /app
WORKDIR /app
CMD node presenter ./demo.json
