const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})

connection.connect((err)=>{
    if(err){
        console.log(`This is Error in DB Connection: ${JSON.stringify(err)}`);
    } else {
        console.log(`Database Connected Successfully`);
    }
})

module.exports = connection;