//노드 서버 만들기

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    fs.readFile("./server2_html.html", (err, data)=>{
        if(err){
            throw err;
        }
        //console.log(data.toString()); //html 내용이 들어가있음
        res.statusCode = 200; //성공, 4xx: 클라이언트 오류, 5xx: 서버 오류
        res.setHeader("Content-Type", "text/html");
        res.end(data);
    });
});

server.listen(8088);
//이벤트
server.on('listening', ()=>{
    console.log("8088번 포트에서 서버가 대기 중입니다.")
});

server.on('error', (error)=>{
    console.error(error);
});