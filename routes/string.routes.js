const express = require('express')
const router = express.Router()
var client = require('./db.config');

router.post('/', (req, res) => {
  client.set(req.body.key, req.body.value, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json({code: value});
    }
  })
})

module.exports = router
