//npm install cookie-parser
//cookieparser 미들웨어 -> 요청 쿠키를 추출할 수 있다.
//request 객체와 response 객체에 cookies 속성과 cookie라는 메서드가 부여된다.

const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

app.use(cookieParser());
app.get('/getCookie', (req, res)=>{
    res.send(req.cookies);
})
app.get('/setCookie', (req, res)=>{
    //쿠키 생성
    res.cookie("st1", "abc");
    res.cookie("st2",{
        name: "백지민",
        age: 5
    });
    res.redirect("/getCookie");
})
app.use(function(req, res){

});

app.listen(8889, function(){
    console.log("8889 포트입니다. http://localhost:8889/setCookie");
});