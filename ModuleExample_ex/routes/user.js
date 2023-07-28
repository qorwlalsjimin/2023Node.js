var login = function (req, res) {
	console.log('/process/login 호출됨.');

	// 요청 파라미터 확인
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

    //데이터베이스 객체 참조
    var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database.db) {
		authUser(database, paramId, paramPassword, function (err, docs) {
			// 에러 발생 시, 클라이언트로 에러 전송
			if (err) {
				console.error('로그인 중 에러 발생 : ' + err.stack);

				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>로그인 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			// 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

				// 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				res.redirect('/login_success.html');

				// res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				// res.write('<h1>로그인 성공</h1>');
				// res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				// res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				// res.write("<br><br><a href='/login.html'>다시 로그인하기</a>");
				// res.end();

			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.redirect('/login_fail.html');

				// res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				// res.write('<h1>로그인  실패</h1>');
				// res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				// res.write("<br><br><a href='/login.html'>다시 로그인하기</a>");
				// res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}

};

var adduser = function (req, res) {
	console.log('/process/adduser 호출됨.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.text || req.query.text;

	console.log("**********", req.body)
	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    //데이터베이스 객체 참조
    var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName, function (err, addedUser) {
			// 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
				console.error('사용자 추가 중 에러 발생 : ' + err.stack);

				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();

				return;
			}

			// 결과 객체 있으면 성공 응답 전송
			if (addedUser) {
				console.dir(addedUser);
				res.redirect('/adduser_success.html');

				// res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				// res.write('<h2>사용자 추가 성공</h2>');
				// res.end();
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}

};

var listuser = function (req, res) {
	console.log('/process/listuser 호출됨.');

    // 데이터베이스 객체 참조
    var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
	if (database.db) {
		// 1. 모든 사용자 검색
        database.UserModel.findAll(function(err, results){
            if(err){
                console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            } else {
                if (results) {  // 결과 객체 있으면 리스트 전송
                    console.dir(results);
    
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<hr><h2>사용자 리스트</h2><hr>');
                    res.write('<div><ul>');
    
                    for (var i = 0; i < results.length; i++) {
                        var curId = results[i]._doc.id;
                        var curName = results[i]._doc.name;
                        res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
                    }
    
                    res.write('</ul></div>');
                    res.write('<br><br><button><a href="/adduser.html">사용자 추가</a></button>');
                    res.write("<button><a href='/login.html'>로그인</a></button>");
    
                    res.end();
                } else {  // 결과 객체가 없으면 실패 응답 전송
                    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                    res.write('<h2>사용자 리스트 조회  실패</h2>');
                    res.end();
                }
            }
        })
	}
};