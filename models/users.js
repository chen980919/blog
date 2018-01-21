
const db = require('./db');


//注册逻辑
exports.addUser =(data,cd)=>{

    let query = 'INSERT INTO users SET ?';

    data.pass = db.md5(data.pass);

    db.query(query,data,(err)=>{
        if(!err){
            return cd(null)
        }
        cd(err);
    })
}

//登录逻辑验证密码
exports.auth = (data,cd) =>{

    let query = 'SELECT * FROM users WHERE email = ?';

    db.query(query,[data.email],(err,rows)=>{
        //console.log(rows);
        if(!err){
        
        //console.log(rows[0].pass);
           if(rows[0].pass == db.md5(data.pass)){
                return cd(null, rows[0]);
           }
        //    return cd({msg: '密码或邮箱错误!'});
        }
        cd(err);
    })
}


//修改用户信息逻辑
exports.update = (data, id, cb) => {
    let query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [data, id], (err) => {
        if(!err) {
            return cb(null);
        }

        cb(err);
    })
}
