var express  = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)

app.configure(function () {
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  })
})

app.get('/', function(req, res) {
  res.send('Out there!')
})

routes = require('./routes/hearts')(app)

server.listen(8080, function() {
  console.log('Node server running on http://localhost:8080')
})
