#docker build -t redisgui:v1 .
FROM node:16-alpine3.14

#ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY server.js server.js
COPY public public

EXPOSE 9900

CMD [ "node", "server.js" ]

#docker tag redisgui:v1 uzrnem/redisgui
#docker push uzrnem/redisgui:0.1.0