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
    
    console.log(url.parse(_url, true));

    if (pathname === '/') {
        if (queryData.id === undefined) {
            title = 'WEB';
        }

        fs.readdir('data', function(error, filelist){
            // var list = `<ul>`;
            // var i = 0;
            // while(i < filelist.length-1){
            //     list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            //     i++
            // }
            // list = list+`</ul>`;

            fs.readFile(`data/${title}`, 'utf-8', function(err, description){
                var list = templateList(filelist);
                var template = templateHTML(title, list, description);
                // var template = `
                // <!DOCTYPE html>
                // <html>
                // <head>
                //     <meta charset="UTF-8">
                //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
                //     <title>WEBn - ${title}</title>
                // </head>
                // <body>
                //     <h1><a href="/">WEB</a></h1>
                //     <div>
                //         ${list}
                //         <div>
                //             <h2>${title}</h2>
                //             <p>${description}</p>
                //         </div>
                //     </div>
                // </body>
                // </html>
                // `;
                response.writeHead(200);
                response.end(template);
            })
        })
    } else {
        response.writeHead(404);
        response.end('Page not found');
    }
});

app.listen(3000)