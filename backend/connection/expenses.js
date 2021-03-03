class expensesRouter{

    addExpense(db, req, res) {
        console.log("req.body: ", req.body);
        let fdata = req.body;
        db.query(`SELECT * FROM TEAM WHERE name ='${fdata.id}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("!!!!!!!!!!", data);
            let inside = data.filter(d => d.member !== fdata.host && d.invitation===1)
            console.log("here", inside);
            let amount = Number((fdata.expense/(inside.length+1)).toFixed(2));
            // console.log("expense, length", fdata.expense, inside.length+1);
            // console.log("amount: ", amount);
            let sql1='';
            let cols =[];
            for(let i = 0; i < inside.length; i++){
                let role = false
                console.log(data[i].G_ID, fdata.description, fdata.expense, fdata.date, inside[i].member, amount, role);
                cols = [data[i].G_ID, fdata.description, fdata.expense, fdata.date, inside[i].member, amount, role]
                sql1 = "INSERT INTO EXPENSES (G_ID, description, expense, date, user, amount, role) VALUES (?,?,?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
            }
            let outside = data.filter(d => d.member === fdata.host)
            console.log("outside", outside);
            console.log("this is user amount before", amount);
            amount = 0 - amount
            console.log("this is user amount after", amount);
            let role = true
            console.log(outside[0].G_ID, fdata.description, fdata.expense, fdata.date, outside[0].member, amount, role);
            cols = [outside[0].G_ID, fdata.description, fdata.expense, fdata.date, outside[0].member, amount, role]
            sql1 = "INSERT INTO EXPENSES (G_ID, description, expense, date, user, amount, role) VALUES (?,?,?,?,?,?,?)";
            db.query(sql1, cols, (err) => {
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
            })
            return;
        })
    }


    getExpense(db, req, res) {
        // console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT * FROM EXPENSES WHERE G_ID ='${req.body.ID}'`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }
            console.log("inside getExpenses", data);
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    getUserInfo(db, req, res) {
        console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT * FROM expenses WHERE expenses.G_ID=(SELECT G_ID FROM expenses WHERE expenses.user='${req.body.ID}' AND role = 1 LIMIT 1) AND role = 0 AND expenses.amount > 0`, (err, data, fields) => {
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
            })
            return;
        })
    }

    getUserOweInfo(db, req, res) {
        console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT e1.G_ID,e1.description,e1.amount,e1.user,e2.user as host FROM EXPENSES AS e1 JOIN EXPENSES AS e2 WHERE e2.role=1 AND
        e1.user='${req.body.ID}' AND e1.description = e2.description AND e1.amount > 0`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            console.log("this is owe", data);
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    updateExpenses(db, req, res) {
        console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT e1.G_ID,e1.E_ID,e1.description,e1.amount,e1.user,e2.user as host FROM EXPENSES AS e1 JOIN EXPENSES AS e2 WHERE e2.role=1 AND
        e1.user='${req.body.ID}' AND e1.description = e2.description AND e1.amount > 0`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            console.log("this is owe", data);
            data.forEach(function(item){
                console.log("this is item", item);
                let paid = "paid"
                let cols = [item.E_ID, item.G_ID, item.user, item.amount, req.body.date]
                let sql1 = "INSERT INTO ACTIVITY (E_ID, G_ID, name, action, date) VALUES (?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount = 0 WHERE E_ID='${item.E_ID}'`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
            })
            return;
        })
        db.query(`SELECT * FROM expenses WHERE expenses.G_ID=(SELECT G_ID FROM expenses WHERE expenses.user='${req.body.ID}' AND role = 1 LIMIT 1) AND role = 0 AND expenses.amount > 0`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            console.log("this is owe", data);
            data.forEach(function(item){
                console.log("this is item", item);
                let cols = [item.E_ID, item.G_ID, item.user, item.amount, req.body.date]
                let sql1 = "INSERT INTO ACTIVITY (E_ID, G_ID, name, action, date) VALUES (?,?,?,?,?)";
                db.query(sql1, cols, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                db.query(`UPDATE EXPENSES SET amount = 0 WHERE E_ID='${item.E_ID}'`, (err) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: ''
                        })
                        return;
                    }
                })
                // res.json({
                //     success: true,
                //     dataset: data
                // })
            })
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }

    calculate(db, req, res) {
        console.log("req.body: ", req.body);
        // let fdata = req.body;
        db.query(`SELECT user,SUM(amount) as total,ACCOUNT.picture,ACCOUNT.username FROM EXPENSES JOIN ACCOUNT ON EXPENSES.user=ACCOUNT.ID WHERE G_ID='${req.body.id}' GROUP BY user`, (err, data, fields) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: ''
                })
                return;
            }            
            // console.log("this is owe", data);
            res.json({
                success: true,
                dataset: data
            })
            return;
        })
    }
}
module.exports = expensesRouter;
