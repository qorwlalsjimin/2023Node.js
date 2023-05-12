var http = require('http');
var express = require('express');
var app = express();

//미들웨어에서 응답 전송할 때 send 메서드 사용하여 JSON 데이터 전송
app.use(function(req, res, next){
    res.redirect('http://google.co.kr'); //redirect: 웹페이지 경로 강제 이동
});

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨')
})