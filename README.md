# redisgui

services:
  redisgui:
    image: redisgui:v1
    container_name: redisgui
    environment:
      CONFIG_REDIS_URI: redis://localhost:6379
      PORT: 8004