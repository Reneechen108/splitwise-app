const multer = require("multer");
const db = require('../connection/db');
var fs = require('fs');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        f_path = '';
        sql = '';
        console.log("upload!!");
        console.log("!req.body!", req.body);
        
        if(req.body.upload === 'group'){
            f_path =  'public/group/';
            sql = 'SELECT COUNT(name) AS ID FROM team';
            console.log("here");
        } else{
            f_path =  'public/user/';
            sql = `SELECT ID FROM ACCOUNT WHERE email = '${req.body.email}'`;
        }
        db.query(sql, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            if(data === null){
                pic_path = f_path + '1/';
                !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
                cb(null, pic_path);
                }
            else{
                pic_path = f_path + (data[0].ID) + '/';
                // f_num = data[0].ID+1;
                !fs.existsSync(pic_path) && fs.mkdirSync(pic_path);
                cb(null, pic_path);
            }

        });
    },

    filename: function(req, file, cb) {
        cb(null, 'profile.png');
    }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;``