//npm init
//npm install express

//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

app.use(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<h1>Express 실행</h1>");
});

app.listen(8889, ()=>{
    console.log("port 8889로 실행");
})