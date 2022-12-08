const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/left/:key/:value', (req, res) => {
  client.lpush(req.params.key, req.params.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.delete('/left/:key', (req, res) => {
  client.lpop(req.params.key, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.post('/right/:key/:value', (req, res) => {
  client.rpush(req.params.key, req.params.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.delete('/right/:key', (req, res) => {
  client.rpop(req.params.key, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})
module.exports = router
