const mysql = require('mysql');

//Database
const db = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'ba265b1db19272',
    password: 'a9c30c6a',
    // password: 'password',
    database: 'heroku_c8d35e15a098b78',
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
