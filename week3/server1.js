//노드 서버 만들기

const http = require('http');

const server = http.createServer((req, res)=>{
    res.write("<h1> Hello Node~~</h1>");
    res.end("<p>Hello Server</p>")
}).listen(8088, ()=>{
    console.log("8088번 포트에서 서버가 대기 중입니다.");
});

