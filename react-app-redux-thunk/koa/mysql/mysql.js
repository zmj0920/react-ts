const pool = require('../pool.js');
const Promise = require('bluebird');

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        // 在数据池中进行会话操作
        pool.getConnection((err, connection) => {
            //报错提示
            if (err) {
                reject(err)
            } else {
                //执行增删改查
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}
//查询用户
exports.user = async () => {
    let _sql = "select * from xz_user";
    return query(_sql);
}


// 删除用户
exports.deleteUserData = async (uid) => {
    let _sql = `delete from xz_user where uid='${uid}';`
    return query(_sql);
}

//修改用户信息
exports.updateUser = async (values) => {
    let _sql = `update  xz_user set uname=?,email=?,phone=?,user_name=?,gender=? where uid=?;`
    return query(_sql, values);
}

exports.insertUser=async (values) =>{
let _sql =`insert into xz_user set ?`;
   return query(_sql,values);
}
