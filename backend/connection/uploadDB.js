const db = require('../connection/db');

const uploadFiles = async (req, res) => {
    try {
        console.log("uploadFiles");
        console.log("req.body!!!!", req.body);
        sql = '';
        if(req.body.upload === 'group'){
            file_path =  'http://localhost:9000/group_pic/';
            sql = 'SELECT COUNT(name) AS ID FROM team';
            db.query(sql, (err, data) => {
                console.log(data);
                if(data[0].ID == null)
                    picture_path = file_path + '1/profile.png';
                else
                    picture_path = file_path + data[0].ID+1 + '/profile.png';
                let fdata = req.body;
                console.log("!!!!!!!!!!!!this is fdata", fdata);
                sql3 = `SELECT * FROM TEAM WHERE name ='${fdata.name}'`;
                let exist = false;
                db.query(sql3, (err, data1) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    // console.log(data1[0]);
                    if(data1[0]){
                        exist = true;
                        res.json({
                            success: false,
                            msg: 'Group name already exist!'
                        })
                        return;
                    }else{
                        console.log("running insert");
                        let size = 0
                        db.query("SELECT name FROM TEAM GROUP BY name", (err, data) => {
                            if(err) {
                                console.log(err);
                                return;
                            }
                            console.log("this is data: ", data.length);
                            size = data.length + 1
                            let invitation;
                        let users = fdata.users.split(',')
                        console.log("fdata.users", users);
                        for(let i = 0; i < users.length; i++){
                            if(i!=users.length-1)
                                invitation=false
                            else
                                invitation=true
                            let cols = [size,fdata.name, users[i], picture_path, invitation]
                            let pending = true
                            console.log("line",i, size,fdata.name, users[i], picture_path, invitation, pending);
                            let sql2 = "INSERT INTO TEAM (G_ID, name, member, picture,invitation) VALUES (?,?,?,?,?,?)";
                            db.query(sql2, cols, (err) => {
                                if(err) {
                                    console.log(err);
                                    res.json({
                                        success: success,
                                        msg: ''
                                    })
                                    return;
                                }
                            })
                        }
                        })
                        res.json({
                            success: true
                        });
                        return;
                    }
                })
            });
        } else{
            file_path = 'http://localhost:9000/user_pic/';
            sql = `SELECT ID FROM ACCOUNT WHERE email = '${req.body.emailID}'`;
            db.query(sql, (err, data) => {
                console.log(data);
                picture_path = file_path + data[0].ID + '/profile.png';
                let fdata = req.body;
                console.log("this is fdata", fdata);
                let cols = [fdata.username, fdata.email, fdata.phone, picture_path, fdata.currency, fdata.time, fdata.language, fdata.emailID];
                let sql2 = "UPDATE ACCOUNT SET username = ?, email = ?," +
                            "phone = ?, picture = ?, currency = ?, time = ?," +
                            "language = ? WHERE email = ?";
                db.query(sql2, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })

                res.json({
                    success: true
                });
                return;
            });
        }
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
  uploadFiles
};