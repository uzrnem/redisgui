# redisgui

```
version: '3.7'

services:
  redis:
    image: redis:6.2.6-alpine3.15
    container_name: redis
    ports:
      - 6379:6379
  redisgui:
    image: uzrnem/redisgui:0.4.2
    container_name: redisgui
    environment:
      CONFIG_REDIS_URI: redis://:${REDIS_PASS}@${REDIS_HOST:localhost}:6379
      PORT: 8003
    ports:
      - 8003:8003
```
