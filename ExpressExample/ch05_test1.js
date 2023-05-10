var http = require('http');

//웹 서버 객체 생성
var server = http.createServer();

//웹서버 3000 포트에서 시작
var port = 3000;
server.listen(port, function(){
    console.log('웹서버 시작되었습니다. %d', port)
})