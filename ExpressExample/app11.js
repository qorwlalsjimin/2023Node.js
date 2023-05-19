//express 기본 모듈
var http = require('http');
var express = require('express');

//express 미들웨어
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

//cookie-parser'
var cookieParser = require('cookie-parser');

//express 객체 생성
var app = express();

app.set('port', process.env.PORT || 3000);

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cookie-parser
app.use(cookieParser());

//라우터 객체 참조
var router = express.Router();

//라우팅 함수 등록
router.route('/process/setUserCookie').get(function(req, res){
    console.log('/process/setUserCookie 호출됨');
    
    //쿠키 설정
    res.cookie('user', {
        id: 'sunny',
        name: '소녀시대',
        authorized: true
    });

    //redirect로 응답
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨.');

    res.send(req.cookies);
})

//라우터 객체를 app 객체에 등록
app.use('/', router);

// //등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res){
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
// });

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 http://localhost:3000/?id=admin&password=1234');
})