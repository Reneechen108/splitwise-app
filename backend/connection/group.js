// SELECT `Splitwise_273`.`team`.member FROM `Splitwise_273`.`team`
// SELECT * FROM `Splitwise_273`.`team` WHERE "Chen" IN ();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class getGroupRouter{

    getGroup(db, req, res) {
        let groupNum = []
        db.query(`SELECT * FROM TEAM WHERE FIND_IN_SET('${req.body.id}',member)`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("get data", data);
            for(let g in data){
                groupNum.push({
                    id: data[g].G_ID,
                    name: data[g].name,
                    picture: data[g].picture,
                    member: data[g].member,
                    invitation: data[g].invitation,
                    rejection: data[g].rejection
                })
            }
            res.json({
                success: true,
                dataset: groupNum
            })
            return;
        });

    }

    allGroup(db, req, res) {
        db.query(`SELECT G_ID,name,picture FROM TEAM WHERE member='${req.body.id}' GROUP BY G_ID,name,picture`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            res.json({
                success: true,
                dataset: data
            });
            return;
        });
    }

    accpet(db, req, res) {
        console.log("!!!!!inside accpet");
        db.query(`UPDATE TEAM SET invitation=true WHERE name="${req.body.name}" AND member=${req.body.user}`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            res.json({
                success: true,
                dataset: data
            });
            console.log("update successfully");
            return;
        });
    }

    reject(db, req, res) {
        console.log("!!!!!inside reject");
        db.query(`UPDATE TEAM SET rejection=true WHERE G_ID="${req.body.id}" AND member=${req.body.member}`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            res.json({
                success: true,
                dataset: data
            });
            console.log("update successfully");
            return;
        });
    }

    recent(db, req, res) {
        db.query(`SELECT * FROM ACTIVITY ORDER BY date DESC`, (err, data, fields) => {
            if(err) {
                res.status(401).json({
                    success: false,
                    error: err
                })
                return;
            }            
            res.status(200).json({
                success: true,
                dataset: data
            })
            return;
        })
        // db.query(`SELECT * FROM EXPENSES JOIN ACCOUNT ON EXPENSES.user=ACCOUNT.ID WHERE user!='${req.body.name}' AND role!=1`, (err, data1) => {
        //     if(err) {
        //         console.log(err);
        //         res.json({
        //             success: false,
        //             msg: ''
        //         })
        //         return;
        //     }
        //     db.query(`SELECT * FROM EXPENSES JOIN ACCOUNT ON EXPENSES.user=ACCOUNT.ID where user='${req.body.name}' and role=1;`, (err, data2) => {
        //         if(err) {
        //             console.log(err);
        //             res.json({
        //                 success: false,
        //                 msg: ''
        //             })
        //             return;
        //         }
        //         res.json({
        //             posts: data2,
        //             owns: data1
        //         });
        //     });
        // });
    }
}
module.exports = getGroupRouter;
