const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/:key/:value', (req, res) => {
  client.sadd(req.params.key, req.params.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

router.delete('/:key/:value', (req, res) => {
  client.srem(req.params.key, req.params.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})
module.exports = router
