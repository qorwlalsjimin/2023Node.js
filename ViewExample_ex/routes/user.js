var login = function(req, res) {
	console.log('/process/login 호출됨.');

	// 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //데이터베이스 객체 참조
     var database = req.app.get('database');
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
	
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database.db) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			// 에러 발생 시, 클라이언트로 에러 전송
			if (err) {
				console.error('사용자 로그인 중 에러 발생 : ' + err.stack);
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 로그인 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
                
				return;
			}
			
			// 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				var context = {userid:paramId, userpassword:paramPassword};
				req.app.render('login_success', context, function(err, html) {
					if (err) {
						console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
						res.write('<p>' + err.stack + '</p>');
						res.end();
						return;
					}
					console.log('rendered : ' + html);
					res.end(html);
				}); 			
			} else {  
				var context = {userid:paramId, userpassword:paramPassword};
				req.app.render('login_fail', context, function(err, html) {
				console.log("rendered : " + html);
				res.end(html);
				});
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
};

var adduser = function(req, res) {
	console.log('/process/adduser 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.name || req.query.name;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

	//데이터베이스 객체 참조
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {
    addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
			// 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
				console.error('사용자 추가 중 에러 발생 : ' + err.stack);
				res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
			} else if (addedUser) {
				console.dir(addedUser);

				var context = { title: '사용자 추가 성공' }; 
				req.app.render('adduser', context, function(err, html) {
					if (err) {
						console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
						res.write('<p>' + err.stack + '</p>');
						res.end();
						return;
					}
					console.log('rendered : ' + html);
					res.end(html);
				}); 		
			}
    });
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
};


var listuser = async function(req, res) {
	console.log('/process/listuser 호출됨.');
        //데이터베이스 객체 참조
        var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
	if (database.db) {
		// 1. 모든 사용자 검색
		try {
			const results = await database.UserModel.findAll();
		  
			if (results.length > 0) {  // 결과 객체 있으면 리스트 전송
				console.dir(results);
				//view - listuser  수정3 전 시작 - listuser.ejs

				//view - listuser 수정3 전 끝
				var context = {results:results};
				req.app.render('listuser', context, function(err, html) {
				    if (err) {
                    console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				            res.write('<h2>뷰 렌더링 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
				            res.end();
                    return;
            	   }
					console.log('rendered : ' + html);
					res.end(html);
				});


			} else {  // 결과 객체가 없으면 실패 응답 전송

				var context = {results:results};
				if (results.length == 0){							
								  req.app.render('listuser_fail', context, function(err, html) {
									console.log("rendered : " + html);
									res.end(html);
								});
				};


			}
		} catch (err) {
			console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
			res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
			res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
			res.write('<p>' + err.stack + '</p>');
			res.end();
			return;
		}
	}
};

var authUser = async function authUser(database, id, password, callback) {
	try {
		console.log('authUser 호출됨 : ' + id + ', ' + password);
		// var users = database.collection('users');
		var docs = await database.UserModel.findById(id);

		if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
			console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
			callback(null, docs);
			return;
		} else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
			console.log("일치하는 사용자를 찾지 못함.");
			callback(null, null);
			return;
		}
  } catch (err) {
    console.error('데이터베이스 연결에 실패했습니다:', err);
    // throw err;
  }
}
	
//사용자를 추가하는 함수
var addUser = async function addUser(database, id, password, name, callback) {
	try {
		console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

		// UserModel 인스턴스 생성
		var user = new database.UserModel({"id":id, "password":password, "name":name});

		// save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
		var addedUser = await user.save(addedUser);
		console.log("사용자 데이터 추가함1.");
		if (user) {
			console.log("사용자 데이터 추가함2.");
			callback(null, addedUser);

		} else {
			console.log("사용자 데이터 추가하지 못함.");
			callback(null, null);
		}
	} catch (err) {
		console.log(err);
	}
}


module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;