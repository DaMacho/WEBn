var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    if (_url == '/'){
        title = 'Welcome';
    }
    if (_url == '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(url.parse(_url, true))
    fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>WEBn - ${title}</title>
        </head>
        <body>
            <h1><a href="index.html">WEB</a></h1>
            <div>
                <ol>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.html">CSS</a></li>
                    <li><a href="3.html">JavaScript</a></li>
                </ol>
                <div>
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            </div>
        </body>
        </html>
        `;
        response.end(template);
    })
});

app.listen(3000)