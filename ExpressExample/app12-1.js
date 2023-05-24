/*
* 쿠키는 클라이언트 웹 브라우저에 저장되는 정보, 세션은 웹 서버에 저장되는 정보
* 웹서버에서 요청 객체에 세션을 설정하면 유지됨 → req.session.세션이름 = 세션객체
* 그 정보를 받은 웹브라우저에서도 connect.sid 쿠키 저장
* 웹브라우저에서 웹서버로 요청할 때 connect.sid 쿠키 정보 전송
* 요청에 들어있는 세션 정보 확인 → req.session.세션이름

*/

//express 기본 모듈
var http = require('http');
var express = require('express');

//express 미들웨어
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

//cookie-parser'
var cookieParser = require('cookie-parser');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

//express 객체 생성
var app = express();
app.set('port', process.env.PORT || 3000);

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/", static(path.join(__dirname, "public"))); // "/" 안 써도 똑같음

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

//라우터 객체 참조
var router = express.Router();

//라우팅 함수 등록
router.route('/').get(function(req, res){
    console.log('/ 호출됨');
    res.redirect('/index.html');
    res.end();
});

router.route('/process/login').post(function(req, res){
    console.log('/process/login 호출됨');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        //이미 로그인된 상태
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/product.html');
    }
    else{
        //세션 저장
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        };

        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>로그인 성공</h1>");
        res.write("<div><p>Param id : " + paramId + "</p></div>");
        res.write("<div><p>Param password : " + paramPassword + "</p></div>");
        res.write(
          "<br><br><button><a href='/process/product'>상품 페이지로 이동하기</a></button>"
        );
        // router.route('/process/product').get으로 연결됨
        res.end();
    };
    //redirect로 응답
});

router.route('/process/logout').get(function(req,res){
    console.log('/process/logout 호출됨.');

    if(req.session.user){
        //로그인된 상태
        console.log('로그아웃합니다.');

        req.session.destroy(function(err){
            if(err) {throw err;}

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/login2.html');
        })
    }else{
        //로그인 안 된 상태
        console.log('아직 로그인되어있지 않습니다.');
        res.redirect('/login2.html');
    }
});

router.route('/process/product').get(function(req,res){
    console.log('/process/product 호출됨.');
    if(req.session.user){
        res.redirect('/product.html');
    }else{
        res.redirect('/login2.html');
    }
});

//라우터 객체를 app 객체에 등록
app.use('/', router);

// //등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res){
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
// });

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
})