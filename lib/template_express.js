
module.exports = {
    HTML:function(title, list, description, control){
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="/style.css">
            <title>WEBn - ${title}</title>
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <div id="grid">
                <div id="panel">
                ${list}
                ${control}
                </div>
                <div id="article">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }, list:function(filelist){
        var list = `<ul>`;
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
            i++
        }
        list = list+`</ul>`;
        return list;
    }
};
