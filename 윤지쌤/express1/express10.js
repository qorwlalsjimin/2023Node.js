//express-session 미들웨어를 사용하면 session 속성을 부여
//npm install express-session

//쿠키는 웹 브라우저 상에서 정보를 저장하는 기술
//세션 서버에 정보를 저장하는 기술
//서버에 위치하는 별도의 저장소에 데이터를 저장하게 됨
//세션 식별자 쿠키를 부여

const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 60*1000
    }
}));

app.use((req,res)=>{
    req.session.now = (new Date()).toUTCString(); //세션 생성
    //접속할때마다 현재 시간을 now 세션에 저장한다.
    res.send(req.session); //세션 화면에 띄우기
})

app.listen(8889, ()=>{
    console.log("8889");
})