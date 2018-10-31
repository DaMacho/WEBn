var sanitizeHtml= require('sanitize-html');

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
            <a href="/author">author</a>
            <div id="grid">
                ${list}
                ${control}
                <div id="article">
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
            list = list + `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
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
            tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`;
            i++;
        }
        return `
            <select name="author">${tag}</select>
        `
    }, authorTable:function(authors){
        var tag = `
            <table>
                <tr>
                    <td>NAME</td>
                    <td>PROFILE</td>
                    <td>UPDATE</td>
                    <td>CREATE</td>
                </tr>
            `;
        var i = 0;
        while(i < authors.length){
            tag += `
                <tr>
                    <td>${sanitizeHtml(authors[i].name)}</td>
                    <td>${sanitizeHtml(authors[i].profile)}</td>
                    <td><a href="/author/update?id=${authors[i].id}">update</a></td>
                    <td>
                        <form action="/author/delete_process" method="post">
                            <input type="hidden" name="id" value="${authors[i].id}">
                            <input type="submit" value="delete">
                        </form>
                    </td>
                </tr>
                `
            i++;
        }
        tag +='</table>';
        return tag;
    }
};