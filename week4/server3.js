//url path를 이용해서 다른 파일 가져오기

const http = require('http');
const fs = require('fs').promises;

const path = require('path');

const server = http.createServer(async (req, res)=>{ //(요청, 응답)
    //에러가 나서 서버 끊기는 것 방지
    try{
        console.log("URL: ", req.url);
        let fileSet = req.url;

        if(req.url == '/favicon.ico'){ //탭 앞의 이미지
            return res.writeHead(404); //오류 느낌
        }else if(req.url == '/'){
            fileSet = "index";
        }

        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}); //성공

        console.log("fileSet: ", fileSet, "__dirname", __dirname);
        console.log("경로: ", path.join(__dirname, "./htmlFile/", fileSet+".html")); //경로
        
        const data = await fs.readFile(`./htmlFile/${fileSet}.html`);
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'}); //에러
        res.end(err.message);
    }

});

server.listen(8088);
//이벤트
server.on('listening', ()=>{
    console.log("8088번 포트에서 서버가 대기 중입니다.")
});

server.on('error', (error)=>{
    console.error(error);
});