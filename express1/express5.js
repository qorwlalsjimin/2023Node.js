//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

//rounter(경로) 미들웨어 사용하기
// - express 모듈에 내장되어 있음
app.get('/', function(req, res){
    res.send(`<h1>페이지</h1>
        <a href='/aaa'>aaa</a>
        <a href='/bbb'>bbb</a>
    `);
});

app.get('/aaa', function(req, res){
    res.send("<h1>aaa페이지</h1>")
});

app.get('/bbb', function(req, res){
    res.send("<h1>bbb페이지</h1>")
});

app.listen(8889, ()=>{
    console.log("port 8889");
})