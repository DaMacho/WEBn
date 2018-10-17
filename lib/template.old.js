module.exports = {
    HTML:function(title, list, description, control){
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
                ${control}
                <div>
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
        while(i < filelist.length-1){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++
        }
        list = list+`</ul>`;
        return list;
    }
};