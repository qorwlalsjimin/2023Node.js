const http = require('http');
const fs = require('fs').promises;

const path = require('path');
const url = require('url');

const server = http.createServer(async (req, res)=>{
    try{
        console.log("URL 부분: ", req.url);

        if(req.url == '/favicon.ico' ){
            res.writeHead(404);
            res.end();
        }

        //지정된 폴더의 파일 리스트를 읽어와서
        const menuFolder = path.join(__dirname, './textFile');
        console.log("내가 읽고 싶은 폴더: ", menuFolder);
        const fileList = fs.readdir(menuFolder); //dir 명령어: readdir을 활용해서 해당 폴더의 내용을 가져옴
        
        //요소 만들기
        let fileListText = '<ul>';//html ul-list 태그
        fileList.then((file_list)=>{
            let ii = 0;
            console.log("file_list", file_list);
            while(ii < file_list.length){
                let dateData = file_list[ii].replace("menu_","").replace(".txt", ""); //파일명 간단하게 만들기
                fileListText += `<li><a href="/?date=${dateData}`;
                ii+=1;
            }
        })

        res.writeHead(200, {'Context-Type': 'text/plain; charset=utf-8'})
        res.end("성공");
    }
    catch(err){
        console.err(err);
        res.writeHead(500, {'Context-Type': 'text/plain; charset=utf-8'})
        res.end(err.message)
    }
});

server.listen(8089);
server.on('listening',()=>{
    console.log("8089번 포트에서 서버 대기중입니다");
})