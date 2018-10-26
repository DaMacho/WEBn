var mysql = require('mysql');
var password = require('')
var db = mysql.createConnection({
    host: '',
    user: '',
    password: `${password}`,
    database: ''
});
db.connect();
module.exports = db;