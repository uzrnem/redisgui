const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/:key/:member/:score', (req, res) => {
  client.zadd(req.params.key, req.params.score, req.params.member, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.post('/incr/:key/:member/:score', (req, res) => {
  client.zincrby(req.params.key, req.params.score, req.params.member, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.delete('/:key/:value', (req, res) => {
  client.zrem(req.params.key, req.params.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

module.exports = router
