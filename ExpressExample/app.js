var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

//express 서버 시작
http.createServer(app).listen(app.get('port'), function(req, res){
    console.log('익스프레스 서버를 시작했습니다');
});