const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.get('/:key', (req, res) => {
  client.zrange(req.params.key, 0, -1, 'withscores', (err, data) => {
    if (err != null) {
      res.json({key: req.params.key, error: err});
    } else {
      var obj = {};
      for ( c = 0 ; c < data.length; c++) {
        obj[data[c]] = data[c+1]
        c++;
      }
      res.json({key: req.params.key, data: obj});
    }
  })
})

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
