var http = require('http');
var fs = require('fs');

//웹 서버 객체 생성
var server = http.createServer();

//웹서버 3000 포트에서 시작
var port = 3000;
server.listen(port, function(){
    console.log('웹서버 시작되었습니다.', port)
});

server.on('request', function(req, res){
    console.log('클라이언트 요청');

    var filename = 'house.png';
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {"Content-Type":"image/png"});
        res.write(data);
        res.end();
    })
})