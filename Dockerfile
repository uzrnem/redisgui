#docker build -t redisgui:0.4.1 .
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

#docker tag redisgui:0.4.1 uzrnem/redisgui:0.4.1
#docker tag redisgui:0.4.1 uzrnem/redisgui:latest
#docker push uzrnem/redisgui:0.4.1
#docker push uzrnem/redisgui:latest