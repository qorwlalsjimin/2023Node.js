/*
* 쿠키는 클라이언트 웹 브라우저에 저장되는 정보, 세션은 웹 서버에 저장되는 정보
* 웹서버에서 요청 객체에 세션을 설정하면 유지됨 → req.session.세션이름 = 세션객체
* 그 정보를 받은 웹브라우저에서도 connect.sid 쿠키 저장
* 웹브라우저에서 웹서버로 요청할 때 connect.sid 쿠키 정보 전송
* 요청에 들어있는 세션 정보 확인 → req.session.세션이름

*/

// Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static')
    , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

//**파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

//**클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors'); //외부 도메인에서 접근 가능

//express 객체 생성
var app = express();
app.set('port', process.env.PORT || 3000);

/* app.use */
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//public 폴더와 uploads 폴더 오픈
app.use(static(path.join(__dirname, "public")));
app.use(static(path.join(__dirname, "uploads")));

// 세션 설정
app.use(expressSession({
    secret: 'my key', //세션 암호화
    resave: true, //세션 항상 저장할것인지
    saveUninitialized: true //초기화 되지 않은채로 스토어에 저장할지
}));

app.use(cors());


//multer 미들웨어 사용: 미들웨어 사용 순서 중요 body-parser => multer => router
//파일 제한: 12개, 1G
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads') //저장될 주소
    },
    filename: function (req, file, callback) { //TODO
        //callback(null, file.originalname + Date.now())
        //callback(null, file.originalname)
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname);
        callback(null, basename + Date.now() + extension);
    }
});

var upload = multer({ //TODO
    storage: storage,
    limits: {
        files: 12,
        fileSize: 1024 * 1024 * 1024
    }
});

//라우터 사용하여 라우팅 함수 등록
var router = express.Router();

//파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photomulti_link').post(upload.array('photo12', 12), function (req, res) {
    //'/process/photo12': action
    //upload.array('photo12', 12): input 태그 name

    console.log('/process/photomulti 호출');
    res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });

    try {
        var files = req.files;

        //현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

        if (Array.isArray(files)) { //배열에 들어간 경우 - 설정에서 1개의 파일도 배열에 넣게 함
            console.log('배열에 들어있는 파일 갯수: %d', files.length);

            for (var index = 0; index < files.length; index++) {
                console.dir(`#==== 업로드된 ${index + 1}번째 파일 정보 ====#`)
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                console.log(`현재 파일 정보: ${originalname}, ${filename}, ${mimetype}, ${size}`)

                //클라이언트에 응답 전송
                res.write(`<h3>${index + 1}번째 파일 업로드 성공</h3>`);
                res.write('<hr>');
                res.write(`<p>원본 파일명: ${originalname} <br> -> 저장 파일명: ${filename}</p>`);
                res.write(`<p>MIME TYPE: ${mimetype}</p>`);
                res.write(`<p>파일 크기: ${size}</p>`);
            }//for-end
            res.write(
                "<br><br><button><a href='/process/product'>상품 페이지로 이동하기</a></button"
            );
            res.end();
        } else { //배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
            console.log("파일 갯수: 1");

            originalname = files[index].originalname;
            filename = files[index].filename;
            mimetype = files[index].mimetype;
            size = files[index].size;
        } //if-end
    } catch (err) {
        console.dir(err.stack);
    }//try-catch-end
}); //router.route('/process/photo')-end

//라우팅 함수 등록
router.route('/').get(function (req, res) {
    console.log('/ 호출됨');
    res.redirect('/index.html');
    res.end();
});

// 로그인
router.route('/process/login').post(function (req, res) {
    console.log('/process/login 호출됨');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if (req.session.user) {
        //이미 로그인된 상태
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/product.html');
    }
    else {
        //세션 저장
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        };
        res.redirect('/login_success.html');
    };
    //redirect로 응답
});

//로그아웃
router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 호출됨.');

    if (req.session.user) {
        //로그인된 상태
        console.log('로그아웃합니다.');

        req.session.destroy(function (err) {
            if (err) { throw err; }

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/login2.html');
        })
    } else {
        //로그인 안 된 상태
        console.log('아직 로그인되어있지 않습니다.');
        res.redirect('/login2.html');
    }
});

//상품
router.route('/process/product').get(function (req, res) {
    console.log('/process/product 호출됨.');
    if (req.session.user) {
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

//이동1
//multer 미들웨어 사용: 미들웨어 사용 순서 중요 body-parser -> multer -> router
//파일 제한: 10개, 1G
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        /* callback(null, file.originalname + Date.now()) */
        //callback(null, file.originalname)
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + Date.now() + extension);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 12,
        files: 1024 * 1024 * 1024
    }
});

//추가5
//파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photomulti_link').post(upload.array('photo12', 12), function (req, res) {
    console.log('***/process/photomulti_link 호출됨');

    res.writeHead('200', { 'Content-Type': 'text/html; charset=utf8' });
    try {
        var files = req.files;

        //현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

        if (Array.isArray(files)) { //배열에 들어간 경우 - 설정에서 1개의 파일도 배열에 넣게 함
            console.log('배열에 들어있는 파일 갯수: %d', files.length);

            for (var index = 0; index < files.length; index++) {
                console.dir(`#==== 업로드된 ${index + 1}번째 파일 정보 ====#`)
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                console.log(`현재 파일 정보: ${originalname}, ${filename}, ${mimetype}, ${size}`)

                //클라이언트에 응답 전송
                res.write('<h3>파일 업로드 성공</h3>');
                res.write('<hr>');
                res.write(`<p>원본파일명: ${originalname} -> 저장 파일명: ${filename}</p>`);
                res.write(`<p>MIME TYPE: ${mimetype}</p>`);
                res.write(`<p>파일 크기: ${size}</p>`);
            }//for-end
            res.write("<br><br><button type=button><a href='/process/product'>상품 페이지로 이동하기</a></button>");
            res.end();

        } else { //배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
            console.log("파일 갯수: 1");

            originalname = files[index].originalname;
            filename = files[index].filename;
            mimetype = files[index].mimetype;
            size = files[index].size;
        } //if-end
    } catch (err) {
        console.dir(err.stack);
    }//try-catch-end
})

//라우터 객체를 app 객체에 등록
app.use('/', router);

//에러 페이지 처리
// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//Express 서버 시작
http.createServer(app).listen(3000, function () {
    console.log('Express 서버가 3000번 포트에서 시작됨 http://localhost:3000/photomulti3206.html');
})