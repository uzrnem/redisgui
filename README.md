# redisgui

```
services:
  redisgui:
    image: uzrnem/redisgui:0.4.1
    container_name: redisgui
    environment:
      CONFIG_REDIS_URI: redis://localhost:6379
      PORT: 8002 # default port is 9900
```