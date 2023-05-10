var http = require('http');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>나의 이름은 윤선희입니다 .serverlisten.js</h1');
    res.end(); 
}).listen(3000);