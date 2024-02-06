// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', function (req, res) {
  const utc = new Date().toString();
  const unix = new Date().valueOf();
  res.json({ unix, utc });
});

app.get('/api/:date', function (req, res) {
  const dateInUrl = req.params.date;
  let utc;
  let unix;
  if (Number(dateInUrl)) {
    unix = Number(dateInUrl);
    utc = new Date(unix).toString();
    res.json({ unix, utc });
  } else if (Date.parse(dateInUrl) !== NaN) {
    unix = Date.parse(dateInUrl);
    utc = new Date(dateInUrl).toString();
    res.json({ unix, utc });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3300, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
