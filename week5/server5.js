const http = require('http');
const fs = require('fs').promises;

const path = require('path');
const url = require('url');
const qs = require('querystring');

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
        await fileList.then((file_list)=>{ //이 블럭이 다 끝나야 다음 줄 실행 (await 키워드)
            let ii = 0;
            console.log("file_list", file_list);
            while(ii < file_list.length){
                let dateData = file_list[ii].replace("menu_","").replace(".txt", ""); //파일명 간단하게 만들기
                fileListText += `<li><a href="/?date=${dateData}">${dateData}</a></li>`;
                ii+=1;
            }
        })


        fileListText += '</ul>';

        console.log(fileListText);

        const searchParams = new URL(req.url," http://localhost:8089").searchParams;
        console.log("searchParams", searchParams);

        const param_date = searchParams.get("date") || "null";
    
        const fileName = path.join(__dirname, `./textFile/menu_${param_date}.txt`);
        let fileData = await fs.readFile(fileName);
        let fileDataString = fileData.toString().replace(/\r/g,"<br>"); //모든(g) 개행 문자를 <br>태그로 변환
        console.log("텍스트: ",fileDataString);

        //crud
        const pathname = url.parse(req.url, true).pathname;
        let subContent = "";
        let title = "";
        if(pathname == '/create'){
            subContent = `<form action="create_process" method="post">
                <p><input type="text" name="title" placeholder="title"/></p>
                <p><textarea name="description" placeholder="description"></textarea></p>
                <p><input type="submit"/></p>
            </form>`
        }

        if(pathname == '/create_process'){
            let body = "";
            req.on('data', function(data){
                body += data;
            });
            req.on('end', function(){
                const post = qs.parse(body);
                const title = post.title; //파일 제목. input태그의 title
                const description = post.description;
                fs.writeFile(path.join(__dirname, `./textFile/menu_${title}.txt`), description, 'utf-8', function(err){});
                console.log("내용: ", post);

                //글 작성후 해당 내용을 볼 수 있도록 링크 이동
                res.writeHead(302, {Location: `?date=${title}`});
                res.end();
            });
        }

        const template = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>급식 메뉴</title>
                </head>
                <body>
                    <h1><a href="/">급식메뉴</a></h1>
                    ${fileListText}
                    <br>
                    ${fileDataString}
                    <br>
                    <a href="create">create</a><a href="/update?id=${title}">update</a>
                    ${subContent}
                </body>
            </html>
        `;

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(template);
    }
    catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(err.message)
    }
});

server.listen(8089);
server.on('listening',()=>{
    console.log("8089번 포트에서 서버 대기중입니다");
})