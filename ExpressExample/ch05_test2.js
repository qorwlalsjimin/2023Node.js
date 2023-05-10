var http = require('http');

//웹 서버 객체 생성
var server = http.createServer();

//웹서버 3000 포트에서 시작
var port = 3000;
server.listen(port, function(){
    console.log('웹서버 시작되었습니다.', port)
});

server.on('connection', function(socket){
    console.log('클라이언트가 접속했습니다.: ', socket.remoteAddress, socket.remotePort);
});

server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    console.dir(req);
});

server.on('close', function(){
    console.log('서버가 종료됩니다.');
})