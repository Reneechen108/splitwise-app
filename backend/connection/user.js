const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

class getUserRouter{

    getUser(db, req, res) {

        db.query(`SELECT ID, username, email, phone, picture, currency, time, language FROM ACCOUNT WHERE email = '${req.body.email}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("inside");
            console.log(data);
            res.json({
                success: true,
                dataset: data
            });
            return;
        });

    }

    allUser(db, req, res) {
        console.log("!!!!!!!searchUser");
        let cols = [req.body.email];
        db.query('SELECT * FROM ACCOUNT', cols, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            //console.log(data);
            res.json({
                success: true,
                dataset: data
            });
            return;
        });
    }

    updateUser(db, req, res) {
        let fdata = req.body;
        upload.single(fdata.picture)
        let cols = [fdata.username, fdata.email, fdata.phone, fdata.picture, fdata.currency, fdata.time, fdata.language, fdata.emailID];
        let sql = "UPDATE ACCOUNT SET username = ?, email = ?," +
                    "phone = ?, picture = ?, currency = ?, time = ?," +
                    "language = ? WHERE email = ?";
        //console.log(cols);
        db.query(sql, cols, (err) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                });
                return;
            }
            //console.log(data);
            res.json({
                success: true
            });
            return;
        });
    }
}
module.exports = getUserRouter;
