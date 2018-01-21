
const express = require('express');

// 解析 post 中间件
const bodyParser = require('body-parser');

// 处理 session 中间件
const session = require('express-session');

// 引入子路由
const home = require('./routes/home');

// 引入子路由
const admin = require('./routes/admin');

const app = express();

// 监听端口
app.listen(3000);

// 配置模板引擎
app.set('view engine', 'xtpl');

app.set('views', './views');

// 设置静态资源
app.use(express.static('./public'));

// 中间件（解析 post 数据）
app.use(bodyParser.urlencoded({extended: false}));

// session 配置
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000 * 24 * 30
    }
}));

// 检测是否登录
app.use('/admin', (req, res, next) => {
    if(!req.session.loginfo) {
        // return res.redirect('/login');
    }
    app.locals.profile = req.session.loginfo;
    // 调用下一个中间件
    next();
})

// 配置前台路由
app.use('/', home);

// 配置后台路由
app.use('/admin', admin);
