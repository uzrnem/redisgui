const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/:key/:item/:value', (req, res) => {
  client.hmset(req.params.key, [req.params.item, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

router.delete('/:key/:value', (req, res) => {
  client.sendCommand("HDEL", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

module.exports = router
