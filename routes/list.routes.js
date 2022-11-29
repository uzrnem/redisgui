const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/left/:key/:value', (req, res) => {
  client.sendCommand("LPUSH", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

router.delete('/left/:key', (req, res) => {
  client.sendCommand("LPOP", [req.params.key], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

router.post('/right/:key/:value', (req, res) => {
  client.sendCommand("RPUSH", [req.params.key, req.params.value], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

router.delete('/right/:key', (req, res) => {
  client.sendCommand("RPOP", [req.params.key], (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})
module.exports = router
