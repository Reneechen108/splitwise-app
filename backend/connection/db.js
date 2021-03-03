const mysql = require('mysql');

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    // password: 'password',
    database: 'Splitwise_273',
    // insecureAuth : true
});
// cmpe202db.chnvttzxfbpw.us-west-1.rds.amazonaws.com

db.connect(function(err) {
    if(err){
        console.log('DB error');
        throw err;
        return false;
    }
    else{
      console.log("Succesfully connect to DB")
    }
    
});

module.exports = db;
