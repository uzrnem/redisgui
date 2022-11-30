#docker build -t redisgui:0.2 .
FROM node:16-alpine3.14

#ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY server.js server.js
COPY public public
COPY routes routes

EXPOSE 9900

CMD [ "node", "server.js" ]

#docker tag redisgui:0.2 uzrnem/redisgui:0.2.0
#docker push uzrnem/redisgui:0.2.0