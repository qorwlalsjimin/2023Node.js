
/*
 * 데이터베이스 스키마 로딩
 * 기본 파일이며 개발자 수정 필요없음
 */

var mongoose = require('mongoose');

// database 객체에 db, schema, model 모두 추가
var database = {};

// 초기화를 위해 호출하는 함수
database.init = function(app, config) {
	console.log('init() 호출됨.');
	
	connect(app, config);
}

//데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connect(app, config) {
	console.log('connect() 호출됨.');
	
	// 데이터베이스 연결 : config의 설정 사용
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(config.db_url);
	database.db = mongoose.connection;
	//위에서 database이름으로 할당이 되어있으므로 database.db라는 이름으로 할당해 봄
	database.db.on('error', console.error.bind(console, 'mongoose connection error.'));	
	database.db.on('open', function () {
		console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);
		
		// config에 등록된 스키마 및 모델 객체 생성
		createSchema(app, config);
		//정의됨 모든 스키마를 활용 - 여러개의 스키마를 쓰는 경우 
	});
	database.db.on('disconnected', connect);

}

// config에 정의된 스키마 및 모델 객체 생성
function createSchema(app, config) {
	var schemaLen = config.db_schemas.length;
	console.log('설정에 정의된 스키마의 수 : %d', schemaLen);
	
	for (var i = 0; i < schemaLen; i++) {
		var curItem = config.db_schemas[i];
		
		// 모듈 파일에서 모듈 불러온 후 createSchema() 함수 호출하기
		var curSchema = require(curItem.file).createSchema(mongoose);
		console.log('%s 모듈을 불러들인 후 스키마 정의함.', curItem.file);
		
		// User 모델 정의
		var curModel = mongoose.model(curItem.collection, curSchema);
		console.log('%s 컬렉션을 위해 모델 정의함.', curItem.collection);
		
		// database 객체에 속성으로 추가
		database[curItem.schemaName] = curSchema;
		//database 라고 하는 모듈 객체에 넣어줌- database의 모듈객체의 속성으로 참조 가능
		database[curItem.modelName] = curModel;
		console.log('스키마 이름 [%s], 모델 이름 [%s] 이 database 객체의 속성으로 추가됨.', curItem.schemaName, curItem.modelName);
	}
		app.set('database', database);
		//database에 database 객체를 그대로 넣을 수 있음
		//모듈을 불러들여서  init이라고 하면 app안에 들어감
	console.log('database 객체가 app 객체의 속성으로 추가됨.');
}
 
// database 객체를 module.exports에 할당
module.exports = database;
