const router = require('koa-router')();  //注意：引入的方式
const sql = require('../mysql/mysql.js');
const bodyParser = require('koa-bodyparser');
const controller = require('../controllers/usercontrollers')

//查询用户
router.get('/user',controller.selectUser);
router.post('/userdelete', controller.deleteUser);
router.post('/userupdate',controller.updateUser);
router.post('/adduser',controller.insertUser);

module.exports = router;
