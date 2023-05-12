var http = require('http');
var express = require('express');
var app = express();

//미들웨어에서 응답 전송할 때 send 메서드 사용하여 JSON 데이터 전송
app.use(function(req, res, next){
    console.log('첫번째 미들웨어에서 요청을 처리함.');
    var person = {name:'방탄소년단send', age:20};
    // res.send(person);

    var personStr = JSON.stringify(person);
    res.send(personStr);

    /*send가 3줄의 역할을 해줌*/
    // res.writeHead('200', {"content-Type":"application/json; charset=utf8"});
    // res.write(personStr);
    // res.end();
});

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨')
})