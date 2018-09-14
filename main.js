var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    
    console.log(queryData.id);

    if (pathname === '/') {
        if (queryData.id === undefined) {
            title = 'WEB';
        }
        fs.readFile(`data/${title}`, 'utf-8', function(err, description){
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
                <h1><a href="/">WEB</a></h1>
                <div>
                    <ol>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ol>
                    <div>
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </div>
                </div>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
        })
    } else {
        response.writeHead(404);
        response.end('Page not found');
    }
});

app.listen(3000)