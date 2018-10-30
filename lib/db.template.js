var mysql = require('mysql');
var password = require('')
var db = mysql.createConnection({
    host: '',
    user: '',
    password: `${password}`,
    database: '', 
    // multipleStatements: true
});
db.connect();
module.exports = db;