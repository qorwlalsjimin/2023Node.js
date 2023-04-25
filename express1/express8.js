//express static

const express = require('express');

const app = express();
app.use(express.static(__dirname+'/public'));

app.use(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end("<img src='/img.jpg' width='100%'>");
});

app.listen(8889, function(){
    console.log("8889 포트입니다.");
});