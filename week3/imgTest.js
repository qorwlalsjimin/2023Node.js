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