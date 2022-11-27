const express = require('express');
const redis = require("redis");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//'redis://username:password@redis_host:6380'
const uri = process.env.CONFIG_REDIS_URI || "redis://localhost:6379"
const port = process.env.PORT || 9900;

const client = redis.createClient({
  url: uri
});
client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client connect'));

app.get('/keys', (req, res) => {
  client.keys('*', (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
});

app.get('/key/:key', (req, res) => {
  client.type(req.params.key, (err, taip) => {
    if (err != null) {
      res.json({err_type: err, err_get: null});
    } else {
      if (taip == 'set') {
        client.smembers(req.params.key, function(err, list) {
          if (err != null) {
            res.json({type: taip, err_get: err});
          } else {
            res.json({type: taip, list});
          }
        })
      } else if (taip == 'hash') {
        client.hgetall(req.params.key, function(err, object) {
          if (err != null) {
            res.json({type: taip, err_get: err});
          } else {
            res.json({type: taip, object});
          }
        })        
      } else {
        client.get(req.params.key, (err, value) => {
          if (err != null) {
            res.json({type: taip, err_get: err});
          } else {
            res.json({type: taip, data: value});
          }
        })
      }
    }
  })
})

app.post('/string', (req, res) => {
  client.set(req.body.key, req.body.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.post('/rename', (req, res) => {
  client.sendCommand("RENAME", [req.body.old, req.body.new], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.post('/set/:key/:value', (req, res) => {
  client.sendCommand("sadd", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.delete('/set/:key/:value', (req, res) => {
  client.sendCommand("SREM", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.post('/hash/:key/:item/:value', (req, res) => {
  client.hmset(req.params.key, [req.params.item, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.delete('/hash/:key/:value', (req, res) => {
  client.sendCommand("HDEL", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.delete('/del/:key', (req, res) => {
  client.del(req.params.key, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.use('/', express.static('public'));

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
