const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const compression = require('compression')
const indexRouter = require('./routes/index')
const topicRouter = require('./routes/topic')

const app = express()

// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.get('*', function(req, res, next){
    fs.readdir('./data', (error, filelist) => {
        req.list = filelist
        next()
    })
})


// route, routing
app.use('/', indexRouter)
app.use('/topic', topicRouter)


// middleware for error handling
app.use(function(req, res, next) {
    res.status(404).send('Sorry cannot find that!')
})
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send(`Something broke!`)
})


var hostname = '127.0.0.1'
var port = 3000

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
