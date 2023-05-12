var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

//미들웨어에서 응답 전송할 때 send 메서드 사용하여 JSON 데이터 전송
app.use(function(req, res, next){
    /*실습: json 객체*/
    // 실습1 x
    // var person = {name:'백지민', age:20};
    // res.writeHead('200', {'Content-Type':'test/html; charset=utf8'});
    // res.end(person);

    // 실습2 o
    // var person = {name:'백지민', age:20};
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
    // res.end(personStr);

    // 실습3 △ 한글깨짐-writeHead utf8가 없어서
    // var person = {name:'백지민', age:20};
    // var personStr = JSON.stringify(person);
    // res.end(personStr);

    // 실습4 o
    // var person = {name:'백지민', age:20};
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    // res.end(personStr);
    
    // 실습5 o
    // var person = {name:'백지민', age:20};
    // var personStr = JSON.stringify(person);
    // res.send(personStr);

    // 실습6 o
    // var person = {name:'백지민', age:20};
    // res.send(person);

    // 실습7 o
    // req.user = 'sunny';
    // res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
    // res.end(`<h1>Express 서버에서 ${req.user}를 res.writeHead와 end로 응답한 결과입니다.</h1>`);

    //실습8 o
    // req.user = 'sunny';
    // res.send(`<h1>Express 서버에서 ${req.user}를 send로 응답한 결과입니다.</h1>`)
    
    //실습9
    // var filename = 'house.png';
    // fs.readFile(filename, function(err, data){
    //     res.send(data);
    // })

});

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨')
})