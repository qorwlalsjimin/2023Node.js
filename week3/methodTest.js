const http = require('http'); //모듈을 불러온다
const url = require('url');

const server = http.createServer();

server.on('request', (req, res)=>{
    console.log("method: ", req.method);
    console.log("url1: ", req.url);
    console.log("url2: ", url.parse(req.url));
    // console.log("url2-1: ", url.parse(req.url));

    if(req.method == "GET"){
        console.log("GET 요청입니다.");
    }
    else if(req.method == "POST"){
        console.log("POST 요청입니다.");
    }

    res.writeHead(200,{'content-type':'text/html'});
    res.write('<!DOCTYPE html><html lange="en" <head><meata charset="UTF-8"</head><body>');
    res.write(`<h1>A type of request is ${req.method}. </h1>`);
    res.end('</body></html>');
})
server.listen(3000, ()=>{
    console.log("server listening");
});