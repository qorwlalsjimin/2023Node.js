//morgan 미들웨어
//외부 모듈이어서 설치해야 함
//npm install morgan
// : 웹 요청이 들어왔을때 로그를 출력하는 미들웨어

const express = require('express');
const morgan = require('morgan');

const app = express();

//어떤 식으로 로그를 설정할건지 정함
app.use(morgan('combined')); //common dev short tiny

app.use(function(req, res){
    res.send("<h1>morgan Test</h1>");
})

app.listen(8889, function(){
    console.log("8889 포트입니다.");
})