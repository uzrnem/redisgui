const express = require('express');
const bodyParser = require('body-parser');
const cSplit = require('quoted-string-space-split');
var client = require('./routes/db.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/keys', (req, res) => {
  client.keys('*', (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
});

app.post('/sendCommand', (req, res) => {
  var command = req.body.command
  var cmds = cSplit.splitSpacesExcludeQuotes(command)
  client.sendCommand(cmds.shift(), cmds, (err, value) => {
    if (err != null) {
      res.json(err.code);
    } else {
      res.json(value);
    }
  })
});

var sendResponse = (res, key, type, err, data) => {
  if (err != null) {
    res.json({key, type, error: err});
  } else {
    res.json({key, type, data});
  }
}

var sendSetResponse = (res, key, type, err, data) => {
  if (err != null) {
    res.json({key, type, error: err});
  } else {
    var obj = {};
    for ( c = 0 ; c < data.length; c++) {
      obj[data[c]] = data[c+1]
      c++;
    }
    res.json({key, type, data: obj});
  }
}

app.get('/key/:key', (req, res) => {
  client.type(req.params.key, (err, taip) => {
    if (err != null) {
      return res.json({error: err});
    }
    if (taip == 'set') {
      client.smembers(req.params.key, (err, data) => {
        sendResponse(res, req.params.key, taip, err, data)
      })
    } else if (taip == 'hash') {
      client.hgetall(req.params.key, (err, data) => {
        sendResponse(res, req.params.key, taip, err, data)
      })
    } else if (taip == 'list') {
      client.lrange(req.params.key, 0, -1, (err, data) => {
        sendResponse(res, req.params.key, taip, err, data)
      })
    } else if (taip == 'zset') {
      client.zrange(req.params.key, 0, -1, 'withscores', (err, data) => {
        sendSetResponse(res, req.params.key, taip, err, data)
      })
    } else {
      client.get(req.params.key, (err, data) => {
        sendResponse(res, req.params.key, taip, err, data)
      })
    }
  })
})

app.post('/rename', (req, res) => {
  client.rename(req.body.old, req.body.new, (err, value) => {
    if (err != null) {
      res.json(err);
    } else {
      res.json(value);
    }
  })
})

app.use('/string', require('./routes/string.routes'));
app.use('/set', require('./routes/set.routes'));
app.use('/hash', require('./routes/hash.routes'));
app.use('/list', require('./routes/list.routes'));
app.use('/sorted-set', require('./routes/sorted-set.routes'))

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

const port = process.env.PORT || 9900;
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
