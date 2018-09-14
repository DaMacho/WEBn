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
                <h2>WEB - ${title}</h2>
                <p>
                    The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    response.end(template);
});

app.listen(3000)