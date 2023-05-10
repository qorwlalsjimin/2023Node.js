var http = require('http');

//웹 서버 객체 생성
var server = http.createServer();

//웹서버 3000 포트에서 시작
var host = '10.96.124.111'
var port = 3000;
server.listen(port, host, '50000', function(){ //50000: 한 번에 접속할 수 있는 client수
    console.log('웹서버 시작되었습니다.', host, port)
})