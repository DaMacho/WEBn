var http = require('http');
var fs = require('fs');
var url = require('url');

function templateList(filelist){
    var list = `<ul>`;
    var i = 0;
    while(i < filelist.length-1){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++
    }
    list = list+`</ul>`;
    return list;
}

function templateHTML(title, list, description){
    return `
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
            ${list}
            <div>
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            var title = 'WEB';
        }
        fs.readdir('data', function(error, filelist){
            fs.readFile(`data/${title}`, 'utf-8', function(err, description){
                var list = templateList(filelist);
                var template = templateHTML(title, list, description);
                response.writeHead(200);
                response.end(template);
            });
        });
    } else if (pathname === '/create') {
        fs.readdir('./data', function(error, filelist){
            title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:3000/process_create" method="post">
                    <p>
                        <input type="text" name="title" placeholder="title">
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `);
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Page not found');
    }
});

app.listen(3000);