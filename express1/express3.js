//npm init
//npm install express

//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

app.use(function(req, res){
    let name = req.query.name;
    let area = req.query.area; //url을 query라고 표현하기도 함

    res.send(`<h1>${name}: ${area}</h1>`);

    //?name=abc&area=seoul
});

app.listen(8889, ()=>{
    console.log("port 8889로 실행 http://localhost:8889/?name=baek&area=seoul");
})