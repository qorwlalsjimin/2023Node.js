//morgan 미들웨어
//외부 모듈이어서 설치해야 함
//npm install morgan
// : 웹 요청이 들어왔을때 로그를 출력하는 미들웨어

const express = require('express');

const app = express();
app.use(express.static(__dirname+'/public'));

app.use(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end("<img src='/img.jpg' width='100%'>");
});

app.listen(8889, function(){
    console.log("8889 포트입니다.");
});