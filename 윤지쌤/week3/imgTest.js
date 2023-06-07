const http = require('http');
const fs = require('fs');

const server1 = http.createServer();
server1.on('request',(req,res)=>{
    fs.readFile("./heart.jpg",(err,data)=>{
        res.writeHead(200,{'Content-Type': 'image/jpeg'});
        res.end(data);
    });
});
server1.listen(3000, ()=>{
    console.log("3000 port 이미지 서버 시작");
})

const server2 = http.createServer();
server2.on('request',(req,res)=>{
    fs.readFile("./bird.mp3",(err,data)=>{
        res.writeHead(200,{'Content-Type': 'audio/mp3'});
        res.end(data);
    });
});
server2.listen(3001, ()=>{
    console.log("3001 port 오디오 서버 시작");
})


const server3 = http.createServer();
server3.on('request',(req,res)=>{
    fs.readFile("./rain.mp4",(err,data)=>{
        res.writeHead(200,{'Content-Type': 'video/mp4'});
        res.end(data);
    });
});
server3.listen(3002, ()=>{
    console.log("3002 port 영상 서버 시작");
})


const server4 = http.createServer();
server4.on('request',(req,res)=>{
    fs.readFile("./rain.mp4",(err,data)=>{
        res.writeHead(302,{'Location': 'http://naver.com'}); //강제 페이지 이동 구현
        res.end(data);
    });
});
server4.listen(3003, ()=>{
    console.log("3003 port 리다이렉트 서버 시작");
})