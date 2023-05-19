//express 기본 모듈
var http = require('http');
var express = require('express');

//express 미들웨어
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

//express error handler
var expressErrorHandler = require('express-error-handler');

//express 객체 생성
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));

//라우터 객체 참조
var router = express.Router();

//라우팅 함수 등록
router.route('/process/users/:id').post(function(req, res){
    console.log('/process/users/:id 처리');
    
    //URL 파라미터 확인
    var paramId = req.params.id;
    console.log('/process/users와 토근 %s를 이용해 처리함', paramId);

    var paramName = req.body.name || req.query.name;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write(`<div><p>Param id: ${paramId}</p></div>`);
    res.write(`<div><p>Param name: ${paramName}</p></div>`);
    res.write(`<div><p>Param password: ${paramPassword}</p></div>`);
    res.write("<br><br><a href='/public/login4.html'>로그인 페이지로 돌아가기</a>");
    res.end();
})

//라우터 객체를 app 객체에 등록
app.use('/', router);

//등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res){
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

//Express 서버 시작
http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨 http://localhost:3000/?id=admin&password=1234');
})