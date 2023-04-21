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

//http://localhost:8889/page/2
app.get('/page/:id', function(req, res){ //내가 사용할 변수(id) 지정
    console.log('page');
    let pageId = req.params.id; //라우터에 있는 변수 가져오기
    //params- /:id처럼 :기호를 이용해서 지정된 라우팅 매개변수
    //query- ?name=A는 요청 매개변수
    res.send(`<h1>${pageId}페이지</h1>
        <a href='/aaa'>aaa</a>
        <a href='/bbb'>bbb</a>
    `);
});

//전체 선택자 => 전체선택자를 사용하는 라우터 메서드는 마지막에 위치할 수 있도록 한다
//모든 라우터를 행당할 수 있음
//express모듈은 라우터 메서드를 사용한 순서대로 요청을 확인한다
app.all('*', function(req, res){
    res.status(404).send("<h1>ERROR-페이지를 찾을 수 없습니다.</h1>");
})

app.listen(8889, ()=>{
    console.log("port 8889");
})