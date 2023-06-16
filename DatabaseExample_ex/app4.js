// Express 기본 모듈 불러오기
var express = require("express"),
  http = require("http"),
  path = require("path");

// Express의 미들웨어 불러오기
var bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler");

// 에러 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
var expressSession = require("express-session");

// 익스프레스 객체 생성
var app = express();

// mongoose 모듈 사용
var mongoose = require('mongoose');

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use("/public", static(path.join(__dirname, "public")));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

//===== 데이터베이스 연결 =====//

// 몽고디비 모듈 사용

// var MongoClient = require("mongodb").MongoClient;
// 데이터베이스 객체를 위한 변수 선언
var database;

//데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

//데이터베이스 모델 객체를 위한 변수 선언
var UserModel;

// 데이터베이스에 연결
function connectDB() {
  // 데이터베이스 연결 정보
  var databaseUrl = "mongodb://127.0.0.1:27017/local";

  // 데이터베이스 연결
  console.log('데이터베이스 연결을 시도합니다.');
  mongoose.Promise = global.Promise; //mongoose의 Promise 객체를 global의 Promise 객체 사용하도록 함
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on('error', console.error.bind(console, 'mongoose connection error.'));
  database.on('open', function(){
	console.log('데이터베이스에 연결되었습니다.: '+databaseUrl);

	//스키마 정의
	UserSchema = mongoose.Schema({
		id: {type: String, required:true, unique:true}, 
		password: {type: String, required:true},
		name: {type: String, index: 'hashed'},
		age: {type: Number, 'default':-1},
		created_at: {type: Date, index:{unique: false}, 'default':Date.now},
		updated_at: {type: Date, index:{unique: false}, 'default':Date.now},
	});

	//스키마에 static으로 findById 메서드 추가
	UserSchema.static('findById', function(id, callback){
		return this.find({id:id}, callback);
	});

	//스키마에 static으로 findAll 메서드 추가
	UserSchema.static('findAll', function(callback){
		return this.find({}, callback);
	})
	console.log('UserSchema 정의함.');

	//UserModel 모델 정의
	UserModel = mongoose.model("users2", UserSchema);
	console.log('UserModel 정의함');
  });

  // 연결 끊어졌을때 5초 후 재연결
  database.on('disconnected', function(){
	console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
	setInterval(connectDB, 5000);
  });
}


// 몽구스 db 사용에 따라 authUser(사용자 인증 함수) 변경
async function authUser(database, id, password, callback){
	try{
		console.log(`authUser 호출됨: ${id}, ${password}`);
		var docs = await UserModel.findById(id);

		if(docs.length > 0){
			console.log(`아이디 ${id}, 패스워드 ${password}가 일치하는 사용자 찾음.`);
			callback(null, docs);
			return;
		}else{
			console.log("일치하는 사용자를 찾지 못함.");
			callback(null, null);
			return;
		}
	}catch(err){
		console.error('데이터베이스 연결에 실패했습니다: ', err);
	}
}

// addUser(사용자 추가 함수)
async function addUser(database, id, password, name, callback){
	try{
		console.log(`addUser 호출됨: ${id}, ${password}, ${name}`);

		//UserModel 인스턴스 생성
		var user = new UserModel({"id":id, "password":password, "name": name});

		//save()로 저장: 저장 성공 시 addedUser 객체가 파라미터로 전달됨
		var addedUser = await user.save(addedUser);

		if(user){
			console.log("사용자 데이터 추가함.");
			callback(null, addedUser);
		}else{
			console.log("사용자 데이터 추가하지 못함.");
			callback(null, null);
		}
	}catch(err){
		console.log(err);
	}
}


//===== 라우팅 함수 등록 =====//
// 라우터 객체 참조
var router = express.Router();
// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 호출됨.");
  // 요청 파라미터 확인
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log("요청 파라미터 : " + paramId + ", " + paramPassword);

  // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
  if (database) {
    authUser(database, paramId, paramPassword, function (err, docs) {
      if (err) {
        throw err;
      } // 파라메터 전달에 오류...
      // 조회된 레코드가 있으면 성공 응답 전송
      if (docs) {
        console.dir(docs);
        // 조회 결과에서 사용자 이름확인
        var username = docs[0].name;
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h1>로그인 성공</h1>");
        res.write("<div><p>사용자 아이디 : " + paramId + "</p></div>");
        res.write("<div><p>사용자 이름 : " + username + "</p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      } else {
        // 조회된 레코드가 없는 경우 실패 응답 전송
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h1>로그인 실패</h1>");
        res.write("<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      } // end- if (docs) {
    }); // end- authUser(database, paramId, paramPassword, function(err, docs) {
  } else {
    // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송, db연결 오류...
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<div><p>데이터베이스에 연결하지 못했습니다.</p></div>");
    res.end();
  } // end- if (database) {
}); // end- router.route('/process/login').post(function(req, res) {


//사용자 추가 라우팅 함수 - 클라이언트에서 보내오는 데이터를 이용해 데이터베이스에 추가
router.route('/process/adduser').post(function(req, res){
	console.log('/process/adduser 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.name || req.query.name;

	console.log(`요청 파라미터: ${paramId}, ${paramPassword}, ${paramName}`);

	//데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if(database){
		addUser(database, paramId, paramPassword, paramName, function(err, result){
			if(err) {throw err;}

			//결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
			if(result && result.insertedCount > 0){
				console.dir(result);
				res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else { //결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
				res.end();
			}
		});
	}else{ //데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
})

router.route('/process/listuser').post(async function(req, res){
	console.log('/process/listuser 호출됨.');

	//데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메서드 호출
	if(database){
		//1. 모든 사용자 검색
		try{
			const results = await UserModel.findAll();

			if(results){
				console.dir(results);

				res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
				res.write('<h2>사용자 리스트</h2>');
				res.write('<div><ul>');

				for(var i = 0; i<results.length; i++){
					var curId = results[i]._doc.id;
					var curName = results[i]._doc.name;
					res.write(`		<li># ${i}: ${curId}, ${curName}</li>`);
				}
				res.write('</ul></div>');
				res.end();
			}else{
				res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
				res.write('<h2>사용자 리스트 조회 실패</h2>');
				res.end();
			}
		}catch(err){
			console.error('사용자 리스트 조회 중 에러 발생: ', err.stack);
			res.writeHead('200', {'Content-Type':'text/html; charset=utf8'});
			res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>'); 
			res.write(`<p>${err.stack}</p>`);
			res.end();
			return; 
		}
	}
})


// 라우터 객체 등록
app.use("/", router);

// 사용자를 인증하는 함수
// var authUser = function (database, id, password, callback) {
//   console.log("authUser 호출됨.");
//   var users = database.collection("users");
//   users.find({ id: id, password: password }).toArray(function (err, docs) {
//     if (err) {
//       callback(err, null);
//       return;
//     }
//     if (docs.length > 0) {
//       console.log(
//         "아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.",
//         id,
//         password
//       );
//       callback(null, docs);
//     } else {
//       console.log("일치하는 사용자를 찾지 못함.");
//       callback(null, null);
//     }
//   });
// };

// async function addUser(database, id, password, name, callback){
// 	try{
// 		console.log('addUser 호출됨: '+id+', '+password+', '+name);

// 		//users 컬렉션 참조
// 		var users = database.collection('users');

// 		//id, password, username을 이용해 사용자 추가
// 		var result = await users.insertMany([{"id": id, "password": password, "name": name}]);

// 		//에러 아닌 경우, 콜백 함수를 호출하면서 결과 객체 전달
// 		if(result.insertedCount > 0){
// 			console.log("사용자 레코드 추가됨: "+result.insertedCount);
// 			callback(null, result);
// 			return;
// 		} else{
// 			console.log("추가된 레코드가 없음");
// 		}
// 	} catch(err){
// 		console.log("일치하는 사용자를 찾지 못함.", err);
// 	}
// }

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));

  // 데이터베이스 연결을 위한 함수 호출
  connectDB();
});