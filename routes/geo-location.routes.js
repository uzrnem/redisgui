const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.get('/:key', (req, res) => {
  client.georadius(req.params.key, 0, 0, 22000, 'km', 'WITHCOORD', (err, data) => {
    if (err != null) {
      res.json({key: req.params.key, error: err});
    } else {
      var obj = {};
      for ( c = 0 ; c < data.length; c++) {
        obj[data[c][0]] = {
          lat: data[c][1][0],
          lng: data[c][1][1]
        }
      }
      res.json({key: req.params.key, data: obj});
    }
  })
})

router.post('/:key/:location', (req, res) => {
  client.geoadd(req.params.key, req.body.lat, req.body.lng, req.params.location, (err, value) => {
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
