//express 기본 모듈
var http = require('http');
var express = require('express');

//express 미들웨어
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

//express 객체 생성
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use('/', static(path.join(__dirname, 'public'))); //localhost:3000/login.html
app.use('/public', static(path.join(__dirname, 'public'))); //localhost:3000/public/login.html

//미들웨어에서 파라미터 확인
app.use(function(req,res,next){
    console.log('첫번째 미들웨어에서 요청 처리');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write(`express 서버에서 응답함`);
    res.write(`param id: ${paramId}`);
    res.write(`param pw: ${paramPassword}`);
    res.end();
})

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 http://localhost:3000/?id=admin&password=1234');
})