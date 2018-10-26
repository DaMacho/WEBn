module.exports = {
    HTML:function(title, list, body, control){
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
                    <p>${body}</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }, list:function(topics){
        var list = `<ul>`;
        var i = 0;
        while(i < topics.length){
            list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
            i++
        }
        list = list+`</ul>`;
        return list;
    }, authorSelect:function(authors, author_id){
        var tag = '';
        var i = 0;
        while (i < authors.length){
            var selected = '';
            if(authors[i].id === author_id){
                selected = ' selected';
            }
            tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
            i++;
        }
        return `
            <select name="author">${tag}</select>
        `
    }
};